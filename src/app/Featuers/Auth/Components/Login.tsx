"use client";

import { Google_user, login } from "@/action/action";
import MaxWidthRappers from "@/components/MaxWidthRapper";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram } from "lucide-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (session?.user) {
    router.push("/");
  }

  async function handleSubmit(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("Please provide all fields");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Logging in");

    try {
      const err = await login({ email, password });
      if (!err) {
        toast.success("Login successful", { id: toastId });
        window.location.reload();
      } else {
        toast.error(String(err), { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Login | Your App Name</title>
        <meta
          name="description"
          content="Log in to your account to access personalized features and content."
        />
        <meta name="keywords" content="login, sign in, account access" />
        <meta property="og:title" content="Login | Yplants" />
        <meta
          property="og:description"
          content="Log in to your account to access personalized features and content."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.URL} />
        <link rel="canonical" href={`${process.env.URL}/login`} />
      </Head>
      <MaxWidthRappers>
        <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                Sign in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" action={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <Label htmlFor="email" className="sr-only">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="rounded-t-md"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="sr-only">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="rounded-b-md"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-black text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <form action={Google_user}>
                  <Button variant="outline" className="w-full">
                    Google
                  </Button>
                </form>

                <Button variant="outline" className="w-full">
                  <Facebook />
                  Facebook
                </Button>
              </div>
            </div>

            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Don not have an account?{" "}
              <Link
                href="/Signup"
                className="font-medium text-primary hover:text-primary-dark"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </MaxWidthRappers>
    </>
  );
}
