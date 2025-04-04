"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Loader, Sprout } from "lucide-react";

import { Button } from "@/components/ui/button";
import MaxWidthRappers from "@/components/MaxWidthRapper";

export default function Register() {
  const router = useRouter();
  const { data: session } = useSession();
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
          body: JSON.stringify({
            email: tempEmail,
            referralCode,
          }),
        });
      }

      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Failed to initiate Google sign-in");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <MaxWidthRappers>
      <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-xl dark:shadow-gray-800 bg-white dark:bg-gray-950">
          <div className="text-center">
            <Sprout className="mx-auto h-12 w-12 text-green-600" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
              Join Vanagrow
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign up with Google to begin your green journey 🌱
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full mt-6"
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
                Continue with Google
              </>
            )}
          </Button>

          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
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
    </MaxWidthRappers>
  );
}
