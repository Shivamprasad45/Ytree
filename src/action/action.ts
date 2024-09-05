"use server";
import { signIn } from "@/auth";
import { User } from "@/Models/SignupModel";

import DbConnect from "@/Utils/mongooesConnect";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import { ContactFormData } from "../../type";
import ContactForm from "@/Models/Contact";

/**
 * The `login` function in TypeScript handles user authentication by signing in with provided
 * credentials and redirecting upon success or handling errors.
 * @param  - The `login` function takes an object as a parameter with two properties: `email` of type
 * string and `password` of type string. These parameters are used to call the `signIn` function with
 * the provided email and password for authentication. If an error occurs during the sign-in process,
 * the
 * @returns The `cause` property of the `CredentialsSignin` error is being returned in case of an
 * error.
 */
const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/", // Optional: set callback URL
      email,
      password,
    });

    // Manually redirect on successful login
    redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    return (error as Error).message;
  }
};

const regester = async (formData: FormData) => {
  const firstName = formData.get("firstname") as string;
  const lastName = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    if (!firstName || !lastName || !password) {
      throw new CredentialsSignin({ cause: "Please provide all fields" });
    }

    await DbConnect();
    // existing user
    const exesting_user = await User.findOne({ email });
    if (exesting_user) {
      throw new CredentialsSignin({ cause: "User already exist" });
    }
    const hashedPassword = await hash(password, 10);

    const Users = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    await User.create(Users);
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
};
const Save_cot_user = async ({ email, name, message }: ContactFormData) => {
  try {
    await DbConnect();
    const User_cont = {
      email,
      name,
      message,
    };
    await ContactForm.create(User_cont);
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
};
export { regester, login, Save_cot_user };
