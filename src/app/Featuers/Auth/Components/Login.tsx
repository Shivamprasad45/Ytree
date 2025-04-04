/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Leaf, Loader } from "lucide-react";

import { login } from "@/action/action";

import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import MaxWidthRappers from "@/components/MaxWidthRapper";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const searchParams = useSearchParams();

  if (session?.user) {
    router.push("/");
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const referralCode = searchParams.get("referral");
      if (referralCode) {
        const tempEmail = `temp_${Date.now()}@example.com`;
        localStorage.setItem("tempEmail", tempEmail);
        await fetch("/api/store-referral", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: tempEmail, referralCode }),
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
    <MaxWidthRappers>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
        <div className="w-full max-w-md space-y-6 bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800">
          <div className="text-center">
            <Leaf className="mx-auto h-10 w-10 text-green-600" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
              Welcome to Vanagrow
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to nurture your green space 🌱
            </p>
          </div>

          <div>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  Continue with Google
                </>
              )}
            </Button>
          </div>

          {/* Optional: Uncomment if you want email/password login later */}
          {/* <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" autoComplete="email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" autoComplete="current-password" />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form> */}

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/Signup"
              className="font-medium text-green-600 hover:text-green-500 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </MaxWidthRappers>
  );
}
