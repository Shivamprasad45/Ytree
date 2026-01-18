/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Loader, Sprout } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
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
        callbackUrl: "/Tree/Free_clam_tree",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Failed to initiate Google sign-in");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Column: Branding and Image */}
      <div className="hidden lg:flex flex-col relative bg-muted text-white dark:border-r">
        {/* Background Image/Gradient */}
        <div className="absolute inset-0 bg-primary/20" />
        <div className="absolute inset-0 bg-[url('/img/forest-login.jpg')] bg-cover bg-center mix-blend-overlay opacity-20" /> {/* Fallback or texture */}

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full p-10 text-center text-[#111811] dark:text-white">
          <div className="mb-8 p-4 bg-background/30 backdrop-blur-md rounded-full">
            <Image
              src="/logo.png"
              alt="VanaGrow Logo"
              width={120}
              height={120}
              className="drop-shadow-xl"
              priority
            />
          </div>
          <h1 className="text-4xl font-black tracking-tight lg:text-5xl mb-4">
            Grow Your Own Forest
          </h1>
          <p className="text-lg opacity-90 max-w-[400px]">
            Join the movement to restore our planet, one tree at a time. Track your impact and watch your legacy grow.
          </p>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="flex items-center justify-center py-12 px-6 lg:px-8 bg-background">
        <div className="mx-auto grid w-full max-w-[400px] gap-6">

          {/* Mobile Logo (Visible only on small screens) */}
          <div className="flex flex-col items-center text-center lg:hidden mb-4">
            <Image src="/logo.png" alt="VanaGrow" width={60} height={60} className="mb-4" />
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your VanaGrow account</p>
          </div>

          <div className="grid gap-2 text-center hidden lg:block">
            <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-muted-foreground">Enter your details regarding your account</p>
          </div>

          <div className="grid gap-4 mt-4">
            {/* Google Sign In */}
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-3 h-12 text-base rounded-xl border-2 hover:bg-muted/50 transition-all"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Image
                  src="/google.svg"
                  alt="Google"
                  width={24}
                  height={24}
                />
              )}
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            {/* General Sign Up */}
            <div className="text-center text-sm">
              New to VanaGrow?{" "}
              <Link href="/Signup" className="underline font-bold hover:text-primary transition-colors">
                Create an account
              </Link>
            </div>
          </div>

          {/* Partnership Call to Action - NEW */}
          <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Sprout className="w-6 h-6" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-1">Corporate Partnership?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Looking to make a bigger impact? collaborative with us.
            </p>
            <Button asChild variant="default" className="w-full rounded-xl font-bold shadow-md">
              <Link href="/patnerShip">
                Apply as a Partner
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
