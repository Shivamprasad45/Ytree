"use server";
import { signIn } from "@/auth";
import { User } from "@/Models/SignupModel";
import { Mail } from "@/Utils/Mailer";
import DbConnect from "@/Utils/mongooesConnect";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import { ContactFormData } from "../../type";
import ContactForm from "@/Models/Contact";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
  redirect("/");
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
    const verificationToken = await hash(process.env.AUTH_SECRET!, 10);

    const Users = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken: verificationToken,
    };

    await User.create(Users);

    Mail({ Email: email, Emailtype: "VERIFY", UserId: verificationToken });
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
