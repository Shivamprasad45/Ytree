"use client";

import { regester } from "@/action/action";
import MaxWidthRappers from "@/components/MaxWidthRapper";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (session?.user) {
    router.push("/");
  }

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const err = await regester(formData);
      if (err) {
        toast.error(String(err));
      } else {
        toast.success("User created successfully");
        router.push("/login");
      }
    } catch (error) {
      toast.error("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Register | Yplant</title>
        <meta
          name="description"
          content="Create your Yplant account to access personalized features and content."
        />
        <meta
          name="keywords"
          content="register, sign up, create account, Yplant"
        />
        <meta property="og:title" content="Register | Yplant" />
        <meta
          property="og:description"
          content="Create your Yplant account to access personalized features and content."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yplant.com/register" />
        <link rel="canonical" href="https://yplant.com/register" />
      </Head>
      <MaxWidthRappers>
        <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                Create your Yplant account
              </h1>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Please provide all the necessary information
              </p>
            </div>
            <form className="mt-8 space-y-6" action={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstname" className="sr-only">
                      First Name
                    </Label>
                    <Input
                      id="firstname"
                      name="firstname"
                      type="text"
                      required
                      className="rounded-t-md sm:rounded-tr-none"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastname" className="sr-only">
                      Last Name
                    </Label>
                    <Input
                      id="lastname"
                      name="lastname"
                      type="text"
                      required
                      className="sm:rounded-tr-md"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
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
                    className=""
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
                    autoComplete="new-password"
                    required
                    className="rounded-b-md"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign up"}
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
                <Button variant="outline" className="w-full">
                  {/* <FaGoogle className="mr-2 h-4 w-4" /> */}
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  {/* <FaFacebook className="mr-2 h-4 w-4" /> */}
                  Facebook
                </Button>
              </div>
            </div>

            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:text-primary-dark"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </MaxWidthRappers>
    </>
  );
}
