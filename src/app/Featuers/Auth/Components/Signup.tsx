"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Loader, Sprout } from "lucide-react";

import { regester } from "@/action/action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MaxWidthRappers from "@/components/MaxWidthRapper";

export default function Register() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (session?.user) {
    router.push("/");
  }
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const searchParams = useSearchParams();
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const referralCode = searchParams.get("referral");

      if (referralCode) {
        // Generate a temporary email identifier
        // This will be linked to the actual email after sign-in
        const tempEmail = `temp_${Date.now()}@example.com`;

        localStorage.setItem("tempEmail", tempEmail);

        // Store the referral code with this temporary email
        await fetch("/api/store-referral", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: tempEmail,
            referralCode,
          }),
        });
      }

      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Failed to initiate Google sign-in");
    } finally {
      setIsGoogleLoading(false);
    }
  };

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
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Sprout className="mx-auto h-12 w-12 text-green-600" />
            <h1 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              Join Vanagrow
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Start your green journey today
            </p>
          </div>
          <form className="mt-8 space-y-6" action={handleSubmit}>
            <div className="space-y-4">
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
                    className="rounded-md"
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
                    className="rounded-md"
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
                  autoComplete="new-password"
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

            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Image
                      src="/google.svg"
                      alt="Google"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Google
                  </>
                )}
              </Button>
            </div>
          </div>

          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
