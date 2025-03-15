"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Copy, Share2, Users, Gift } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import { Input } from "@/components/ui/input";

export default function ReferralPage() {
  const { data: session, status } = useSession();
  const [referralUrl, setReferralUrl] = useState("");
  const [referralStats, setReferralStats] = useState({
    totalReferred: 0,
    rewards: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // Fetch referral code from user session or make an API call
      const fetchReferralData = async () => {
        try {
          setIsLoading(true);

          // Make API call to get user's referral data
          const response = await fetch("/api/user/referral");
          const data = await response.json();

          if (data.success) {
            const baseUrl = window.location.origin;
            setReferralUrl(`${baseUrl}/Signup?referral=${data.referralCode}`);
            setReferralStats({
              totalReferred: data.referredUsers || 0,
              rewards: data.rewards || 0,
            });
          } else {
            toast.error("Failed to load referral data");
          }
        } catch (error) {
          console.error("Error fetching referral data:", error);
          toast.error("Something went wrong while fetching referral data");
        } finally {
          setIsLoading(false);
        }
      };

      fetchReferralData();
    }
  }, [session, status]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralUrl)
      .then(() => {
        toast.success("Referral link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast.error("Failed to copy. Please try again.");
      });
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Vanagrow with my referral link",
          text: "Sign up for Vanagrow using my referral link and we both get rewards!",
          url: referralUrl,
        });
        toast.success("Thanks for sharing!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      copyToClipboard();
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <MaxWidthRappers>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      </MaxWidthRappers>
    );
  }

  if (status === "unauthenticated") {
    return (
      <MaxWidthRappers>
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold mb-4">
            Please sign in to access your referral program
          </h1>
          <Button>Sign In</Button>
        </div>
      </MaxWidthRappers>
    );
  }

  return (
    <MaxWidthRappers>
      <div className="py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Your Referral Program
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Referrals
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {referralStats.totalReferred}
              </div>
              <p className="text-xs text-muted-foreground">
                People who signed up using your link
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Rewards Earned
              </CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referralStats.rewards}</div>
              <p className="text-xs text-muted-foreground">
                Points earned from successful referrals
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Share Your Referral Link</CardTitle>
            <CardDescription>
              Invite friends and earn rewards when they sign up and make their
              first purchase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input value={referralUrl} readOnly className="flex-1" />
              <Button onClick={copyToClipboard} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={shareLink}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share with Friends
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How Referrals Work</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Share your unique referral link with friends and family</li>
              <li>
                When someone signs up using your link, they become your referral
              </li>
              <li>
                You earn rewards when your referrals make their first purchase
              </li>
              <li>The more friends you refer, the more rewards you earn!</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </MaxWidthRappers>
  );
}
