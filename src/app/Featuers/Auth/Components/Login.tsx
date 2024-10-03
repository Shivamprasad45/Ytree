/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Leaf } from "lucide-react";

import { login } from "@/action/action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MaxWidthRappers from "@/components/MaxWidthRapper";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (session?.user) {
    router.push("/");
  }

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Error during Google sign-in", error);
    }
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
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
    <MaxWidthRappers className="">
      <div className="flex min-h-screen ">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <Leaf className="mx-auto h-12 w-12 text-green-600" />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                Welcome to Vanagrow
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Sign in to nurture your green space
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
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
                    className="rounded-md"
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
                    className="rounded-md"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
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

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                >
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Google
                </Button>
              </div>
            </div>

            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/Signup"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MaxWidthRappers>
  );
}
