"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Gift,
  Share2,
  Users,
  ChevronRight,
  Award,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import MaxWidthRappers from "@/components/MaxWidthRapper";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import SkyLanternReferral from "./garden";

export default function ReferralPage() {
  const { data: session, status } = useSession();
  const [referralUrl, setReferralUrl] = useState("");
  const [referralStats, setReferralStats] = useState({
    totalReferred: 0,
    rewards: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
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
            toast({
              title: "Error",
              description: "Failed to  load referral data",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error fetching referral data:", error);
          toast({
            title: "Error",
            description: "Something went wrong while fetching referral data",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchReferralData();
    }
  }, [session, status, toast]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralUrl)
      .then(() => {
        setCopied(true);
        toast({
          title: "Success!",
          description: "Referral link copied to clipboard",
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast({
          title: "Error",
          description: "Failed to copy. Please try again.",
          variant: "destructive",
        });
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
        toast({
          title: "Shared!",
          description: "Thanks for sharing!",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      copyToClipboard();
    }
  };

  // Calculate progress percentage for the progress bar
  const progressPercentage = Math.min(
    (referralStats.totalReferred / 10) * 100,
    100
  );

  if (status === "loading" || isLoading) {
    return (
      <MaxWidthRappers>
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground animate-pulse">
            Loading your referral dashboard...
          </p>
        </div>
      </MaxWidthRappers>
    );
  }

  if (status === "unauthenticated") {
    return (
      <MaxWidthRappers>
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md"
          >
            <Gift className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h1 className="text-3xl font-bold mb-4">
              Join Our Referral Program
            </h1>
            <p className="text-muted-foreground mb-8">
              Sign in to access exclusive rewards and share the benefits with
              your friends and family.
            </p>
            <Button size="lg" className="px-8">
              Sign In
            </Button>
          </motion.div>
        </div>
      </MaxWidthRappers>
    );
  }

  return (
    <MaxWidthRappers>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-10 px-4 max-w-5xl mx-auto"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
              Your Referral Garden
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Invite friends, earn rewards, and watch your garden flourish with
              each successful referral.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <SkyLanternReferral
            referralCount={referralStats.totalReferred}
            targetCount={10}
          />
        </motion.div>

        <Tabs defaultValue="stats" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="stats">Your Stats</TabsTrigger>
            <TabsTrigger value="share">Share</TabsTrigger>
            <TabsTrigger value="how">How It Works</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="overflow-hidden border-2 border-green-100 dark:border-green-900/30">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">
                        Total Referrals
                      </CardTitle>
                      <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex items-end gap-2">
                      <div className="text-4xl font-bold">
                        {referralStats.totalReferred}
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        / 10 goal
                      </div>
                    </div>
                    <Progress
                      value={progressPercentage}
                      className="h-2 mt-4 bg-green-100 dark:bg-green-900/30"
                    />
                    <p className="text-sm text-muted-foreground mt-4">
                      People who signed up using your link
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="overflow-hidden border-2 border-green-100 dark:border-green-900/30">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">
                        Rewards Earned
                      </CardTitle>
                      <Gift className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <div className="text-4xl font-bold">
                        {referralStats.rewards}
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">
                        Points
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                      <Award className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Redeem in the rewards section</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="share">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-2 border-green-100 dark:border-green-900/30 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                    Share Your Referral Link
                  </CardTitle>
                  <CardDescription>
                    Invite friends and earn rewards when they sign up and make
                    their first purchase
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Input
                        value={referralUrl}
                        readOnly
                        className="pr-10 bg-muted/50 border-2 focus:border-green-500 transition-all"
                      />
                      {copied && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </motion.div>
                      )}
                    </div>
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="border-2 border-green-200 dark:border-green-900 hover:border-green-300 dark:hover:border-green-800 transition-all"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 pb-6">
                  <Button
                    onClick={shareLink}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 transition-all"
                    size="lg"
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Share with Friends
                  </Button>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center gap-2"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="#1877F2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                      </svg>
                      <span className="hidden sm:inline">Facebook</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center gap-2"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="#1DA1F2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      <span className="hidden sm:inline">Twitter</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center gap-2"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="#25D366"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span className="hidden sm:inline">WhatsApp</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center gap-2"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="#0A66C2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span className="hidden sm:inline">LinkedIn</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="how">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-2 border-green-100 dark:border-green-900/30">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <CardTitle>How Referrals Work</CardTitle>
                  <CardDescription>
                    Follow these simple steps to earn rewards through our
                    referral program
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-800 dark:text-green-300 font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">
                          Share your unique link
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Copy your personal referral link and share it with
                          friends and family through email, social media, or
                          messaging apps.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-800 dark:text-green-300 font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Friends sign up</h3>
                        <p className="text-sm text-muted-foreground">
                          When someone clicks your link and creates an account,
                          they&#39;re automatically connected to you as a
                          referral.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-800 dark:text-green-300 font-bold">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Earn rewards</h3>
                        <p className="text-sm text-muted-foreground">
                          You earn points when your referrals make their first
                          purchase. They also receive a special discount as a
                          thank you!
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-800 dark:text-green-300 font-bold">
                        4
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">
                          Watch your garden grow
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Each successful referral adds a new element to your
                          virtual garden. Reach milestones to unlock special
                          rewards and achievements!
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center pt-2 pb-6">
                  <Button
                    variant="outline"
                    className="border-2 border-green-200 dark:border-green-900 hover:border-green-300 dark:hover:border-green-800 transition-all"
                  >
                    Start Sharing Now
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-green-50 dark:bg-green-900/10 rounded-xl p-6 text-center"
        >
          <h3 className="text-xl font-semibold mb-3">Milestone Rewards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div
              className={`p-4 rounded-lg border-2 ${
                referralStats.totalReferred >= 3
                  ? "bg-white dark:bg-green-900/20 border-green-300 dark:border-green-700"
                  : "bg-muted/50 border-muted"
              }`}
            >
              <div className="text-lg font-medium mb-1">3 Referrals</div>
              <div className="text-sm text-muted-foreground mb-2">
                Free shipping on next order
              </div>
              {referralStats.totalReferred >= 3 ? (
                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Unlocked
                </span>
              ) : (
                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {3 - referralStats.totalReferred} more to unlock
                </span>
              )}
            </div>

            <div
              className={`p-4 rounded-lg border-2 ${
                referralStats.totalReferred >= 5
                  ? "bg-white dark:bg-green-900/20 border-green-300 dark:border-green-700"
                  : "bg-muted/50 border-muted"
              }`}
            >
              <div className="text-lg font-medium mb-1">5 Referrals</div>
              <div className="text-sm text-muted-foreground mb-2">
                15% discount coupon
              </div>
              {referralStats.totalReferred >= 5 ? (
                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Unlocked
                </span>
              ) : (
                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {5 - referralStats.totalReferred} more to unlock
                </span>
              )}
            </div>

            <div
              className={`p-4 rounded-lg border-2 ${
                referralStats.totalReferred >= 10
                  ? "bg-white dark:bg-green-900/20 border-green-300 dark:border-green-700"
                  : "bg-muted/50 border-muted"
              }`}
            >
              <div className="text-lg font-medium mb-1">10 Referrals</div>
              <div className="text-sm text-muted-foreground mb-2">
                Free premium product
              </div>
              {referralStats.totalReferred >= 10 ? (
                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Unlocked
                </span>
              ) : (
                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {10 - referralStats.totalReferred} more to unlock
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </MaxWidthRappers>
  );
}
