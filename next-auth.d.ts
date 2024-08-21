import { JWT } from "next-auth/jwt";
import { User as NextAuthUser } from "next-auth";

// Extending NextAuth User type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name: string;
    } & NextAuthUser;
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
  }
}

// Extending JWT type
declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    role: string;
    name: string;
  }
}
