/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Loader, Sprout, User, Users, Building2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ROLES = [
  {
    id: "USER",
    title: "User",
    description: "Individual planting trees & viewing impact.",
    icon: User,
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
    activeColor: "ring-blue-500 bg-blue-50",
  },
  {
    id: "NGO",
    title: "NGO Partner",
    description: "Plants, maintains, and uploads proof.",
    icon: Users,
    color: "bg-green-500/10 text-green-600 border-green-200",
    activeColor: "ring-green-500 bg-green-50",
  },
  {
    id: "CORPORATE",
    title: "Corporate",
    description: "Sponsors plantations & views dashboards.",
    icon: Building2,
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
    activeColor: "ring-purple-500 bg-purple-50",
  },
];

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Try to get role from localStorage if it exists
    const savedRole = localStorage.getItem("userRole");
    if (savedRole && ROLES.find(r => r.id === savedRole)) {
      setSelectedRole(savedRole);
    }
  }, []);

  if (session?.user) {
    router.push("/");
  }

  const handleGoogleSignIn = async () => {
    if (!selectedRole) {
      toast.error("Please select a role first");
      return;
    }

    setIsGoogleLoading(true);
    try {
      // Save selected role to localStorage
      localStorage.setItem("userRole", selectedRole);

      // Set cookies for the server to read during the auth callback
      // Using a short expiry (5 minutes) and Lax SameSite for security/reliability
      const cookieConfig = "path=/; max-age=300; SameSite=Lax";
      document.cookie = `selected_role=${selectedRole}; ${cookieConfig}`;

      const referralCode = searchParams.get("referral");
      if (referralCode) {
        document.cookie = `referral_code=${referralCode}; ${cookieConfig}`;
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

          <div className="grid gap-4 mt-2">
            <div className="text-sm font-semibold text-muted-foreground mb-1">Select Your Role:</div>
            <div className="grid gap-3 mb-4">
              {ROLES.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group relative",
                      isSelected
                        ? cn("border-primary ring-2 ring-primary/20 bg-primary/5", role.activeColor)
                        : "border-transparent bg-muted/30 hover:bg-muted/50"
                    )}
                  >
                    <div className={cn("p-3 rounded-xl", role.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm">{role.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{role.description}</div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-primary absolute top-4 right-4 animate-in zoom-in duration-300" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Google Sign In */}
            <Button
              variant="outline"
              className={cn(
                "w-full flex items-center justify-center gap-3 h-14 text-base rounded-2xl border-2 transition-all font-bold",
                !selectedRole ? "opacity-50 grayscale cursor-not-allowed" : "hover:bg-muted/50 border-primary/20"
              )}
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || !selectedRole}
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
              {selectedRole ? `Continue as ${ROLES.find(r => r.id === selectedRole)?.title.split(' ')[0]}` : "Select a Role to Continue"}
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
