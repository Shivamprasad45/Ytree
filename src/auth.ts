import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import DbConnect from "./Utils/mongooesConnect";
import { User } from "./Models/SignupModel";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access: "offline",
          response_type: "code",
        },
      },
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const email = credentials?.email as string | undefined;
          const password = credentials?.password as string | undefined;

          if (!email || !password) {
            throw new CredentialsSignin({
              cause: "Email and password are required.",
            });
          }

          await DbConnect();
          const user = await User.findOne({ email }).select("+password +role");

          if (!user || !user.password) {
            throw new CredentialsSignin({
              cause: "User not found.",
            });
          }

          const isMatched = await compare(password, user.password);

          if (!isMatched) {
            throw new CredentialsSignin({ cause: "Incorrect password." });
          }

          return {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            image: user.image,
          };
        } catch (error) {
          if (error instanceof CredentialsSignin) {
            throw error;
          } else {
            throw new CredentialsSignin({
              cause: "An unexpected error occurred. Please try again.",
            });
          }
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        await DbConnect();
        const dbUser = await User.findOne({ email: token.email });

        if (dbUser) {
          session.user.id = dbUser._id.toString();
          session.user.name = `${dbUser.firstName} ${dbUser.lastName}`;
          session.user.role = dbUser.role;
          session.user.image = dbUser.image;
        }
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id!;
        token.role = user.role;
        token.name = user.name!;
        token.image = user.image;
      }
      return token;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          await DbConnect();

          // Get reliable data from cookies (set on the frontend in Login.tsx)
          const { cookies } = await import("next/headers");
          const cookieStore = cookies();

          const selectedRole = cookieStore.get("selected_role")?.value?.toUpperCase() || "USER";
          const referralCode = cookieStore.get("referral_code")?.value || null;

          const existingUser = await User.findOne({ email });

          if (!existingUser) {
            await User.create({
              email,
              firstName: name?.trim().split(" ")[0] || "",
              lastName: name?.trim().split(" ")[1] || "",
              role: selectedRole,
              image,
              authProviderId: id,
              referralCode: Math.random().toString(36).substring(2, 10),
              referredBy: referralCode,
            });

            if (referralCode) {
              await User.findOneAndUpdate(
                { referralCode },
                { $inc: { referredUsers: 1 } }
              );
            }
          } else {
            // Update role if it's different to honor the current selection
            if (existingUser.role !== selectedRole) {
              existingUser.role = selectedRole;
              await existingUser.save();
            }
          }

          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
  },
});
