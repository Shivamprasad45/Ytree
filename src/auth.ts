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
              cause: "User not exist",
            });
          }

          const isMatched = await compare(password, user.password);

          if (!isMatched) {
            throw new CredentialsSignin({ cause: "Wrong password" });
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
    // Redirect to the login page on error
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub as string;
        session.user.role = token.role;
        session.user.name = token.name as string; // Add name
        session.user.image = token.image as string; // Add image
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id!;
        token.role = user.role!;
        token.name = `${user.firstName} ${user.lastName}`; // Construct name
        token.image = user.image; // Ensure this is set
      }
      return token;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          await DbConnect();
          console.log(email, name, image, "Account", account);
          const alreadyUser = await User.findOne({ email });

          if (!alreadyUser) {
            await User.create({ email, name, image, authProviderId: id });
          }
        } catch (error) {
          const errorMessage = "Error while creating user";

          throw new CredentialsSignin({ cause: errorMessage });
        }
      }
      return true;
    },
  },
});
