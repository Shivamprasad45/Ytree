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
            throw error; // Re-throw the custom error
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
      console.log(user, "jwt");
      if (user) {
        token.sub = user.id!;
        token.role = user.role;
        token.name = user.name!; // Construct name
        token.image = user.image;
      }

      return token;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          await DbConnect();
          console.log(email, name, image, id, "Account");

          // Find the existing user in the database
          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            // If the user does not exist, create a new user
            const newUser = await User.create({
              email,
              firstName: name?.trim().split(" ")[0] || "",
              lastName: name?.trim().split(" ")[1] || "",
              role: "user",
              image,
              authProviderId: id,
            });
            console.log(newUser, "New User");
            return true; // Return true for successful sign-in
          }
          console.log(existingUser, "Already exist");

          return true; // Allow sign-in
        } catch (error) {
          console.log(error, "error during sign-in");
          throw new CredentialsSignin({
            cause: "An unexpected error occurred.",
          });
        }
      }
      return true; // For other providers
    },
  },
});
