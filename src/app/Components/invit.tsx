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
  Award,
  Sparkles,
  CheckCircle2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";

import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import {
  useFree_plants_clam_ReferelMutation,
  useReferelMutation,
} from "../Featuers/TreeOrder/TreeOrderServices";
import MaxWidthWrapper from "./Anothers/MaxWidthWrapper";

export default function ReferralPage() {
  const { data: session, status } = useSession();
  const [referralUrl, setReferralUrl] = useState("");
  const [referralStats, setReferralStats] = useState({
    totalReferred: 0,
    rewards: 0,
  });
  const [
    Grf,
    {
      data: Refrel,
      isLoading: isRefrelLoading,
      isSuccess: isRefrelSuccess,
      reset,
    },
  ] = useReferelMutation();

  const [
    Free_tree_clam,
    { isLoading: isClaimLoading, isSuccess: isClaimSuccess },
  ] = useFree_plants_clam_ReferelMutation();

  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const claimReward = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to claim rewards",
        variant: "destructive",
      });
      return;
    }

    if (referralStats.totalReferred < 10) {
      toast({
        title: "Not enough referrals",
        description: "You need 10 referrals to claim a reward",
        variant: "destructive",
      });
      return;
    }

    try {
      await Free_tree_clam({
        UserId: session.user.id,
        imageUrl: "",
        name: `${session.user.firstName || ""} ${session.user.lastName || ""}`,
        age: Date.now(),
        findtree_id: "",
        Plaintid: "",
        status: 0,
        _id: "",
      });

      reset();
      await Grf();

      toast({
        title: "Success!",
        description: "Your reward has been claimed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to claim reward. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const fetchReferralData = async () => {
        try {
          setIsLoading(true);
          await Grf();
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
  }, [session, status, toast, Grf]);

  useEffect(() => {
    if (isRefrelSuccess && Refrel?.success) {
      const baseUrl = window.location.origin;
      setReferralUrl(`${baseUrl}/Signup?referral=${Refrel.referralCode}`);
      setReferralStats({
        totalReferred: Refrel.referredUsers || 0,
        rewards: Refrel.rewards || 0,
      });
    } else if (!isRefrelLoading && Refrel && !Refrel.success) {
      toast({
        title: "Error",
        description: "Failed to load referral data",
        variant: "destructive",
      });
    }
  }, [Refrel, isRefrelSuccess, isRefrelLoading, toast]);

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

  const progressPercentage = Math.min(
    (referralStats.totalReferred / 10) * 100,
    100
  );

  const canClaimReward = referralStats.totalReferred >= 10;

  if (status === "loading" || isLoading) {
    return (
      <MaxWidthWrapper>
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground animate-pulse">
            Loading your referral dashboard...
          </p>
        </div>
      </MaxWidthWrapper>
    );
  }

  if (status === "unauthenticated") {
    return (
      <MaxWidthWrapper>
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
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-10 px-4 max-w-5xl mx-auto"
      >
        {/* Improved Header Section with Clear Value Proposition */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
              Refer Friends, Get Free Plants
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Share Vanagrow with friends and earn rewards with each successful
              referral.
            </p>
          </motion.div>
        </div>

        {/* How It Works Section - Moved Up for Better Context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <Card className="border-2 border-green-100 dark:border-green-900/30">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Gift className="h-5 w-5 text-green-600" />
                How It Works
              </CardTitle>
              <CardDescription>
                Three simple steps to earn free plants and rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 mb-4">
                    <Share2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium mb-2">1. Share Your Link</h3>
                  <p className="text-sm text-muted-foreground">
                    Copy your unique referral link and share it with friends
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 mb-4">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium mb-2">2. Friends Sign Up</h3>
                  <p className="text-sm text-muted-foreground">
                    When friends create an account using your link, you earn
                    points
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 mb-4">
                    <Gift className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium mb-2">3. Get Free Plants</h3>
                  <p className="text-sm text-muted-foreground">
                    Refer 10 friends and claim a free plant as a reward
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column: Rewards Section (Moved Up from bottom right) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Rewards Card - Prioritized */}
            <Card className="overflow-hidden border-2 border-green-100 dark:border-green-900/30">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Your Rewards
                  </CardTitle>
                  <Gift className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-4xl font-bold">
                    {referralStats.rewards}
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">
                    Points
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 mt-0.5 text-green-600 dark:text-green-400" />
                    <div>
                      <h4 className="font-medium text-sm">Free Plant Reward</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Get a free plant when you refer 10 friends
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={claimReward}
                  disabled={!canClaimReward || isClaimLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 transition-all"
                >
                  {isClaimLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                      Processing...
                    </>
                  ) : canClaimReward ? (
                    "Claim Your Free Plant"
                  ) : (
                    "Keep Referring to Unlock"
                  )}
                </Button>

                {!canClaimReward && (
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    You need {10 - referralStats.totalReferred} more referrals
                    to claim
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Referral Stats Card */}
            <Card className="overflow-hidden border-2 border-green-100 dark:border-green-900/30">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Your Progress
                  </CardTitle>
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-end justify-between">
                  <div className="flex items-end gap-2">
                    <div className="text-4xl font-bold">
                      {referralStats.totalReferred}
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">
                      people referred
                    </div>
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    {referralStats.totalReferred >= 10
                      ? "Goal reached!"
                      : `${10 - referralStats.totalReferred} more to go`}
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress
                    value={progressPercentage}
                    className="h-2 bg-green-100 dark:bg-green-900/30"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Refer 10 friends to unlock your free plant
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column: Referral Link and Sharing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="border-2 border-green-100 dark:border-green-900/30 overflow-hidden h-full">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Share Your Referral Link
                </CardTitle>
                <CardDescription>
                  Invite friends to join Vanagrow and earn rewards together
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-3">
                  <div className="relative flex-1">
                    <Input
                      value={referralUrl}
                      readOnly
                      className="pr-10 bg-muted/50 border-2 focus:border-green-500 transition-all"
                    />
                    <AnimatePresence>
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
                    </AnimatePresence>
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

                <div className="grid grid-cols-4 gap-3 w-full">
                  <Button
                    variant="outline"
                    size="icon"
                    className="aspect-square"
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          referralUrl
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    <Facebook className="h-5 w-5 text-[#1877F2]" />
                    <span className="sr-only">Share on Facebook</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="aspect-square"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          referralUrl
                        )}&text=${encodeURIComponent(
                          "Join Vanagrow with my referral link!"
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                    <span className="sr-only">Share on Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="aspect-square"
                    onClick={() =>
                      window.open(
                        `https://wa.me/?text=${encodeURIComponent(
                          `Join Vanagrow using my referral link: ${referralUrl}`
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    <MessageCircle className="h-5 w-5 text-[#25D366]" />
                    <span className="sr-only">Share on WhatsApp</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="aspect-square"
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          referralUrl
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                    <span className="sr-only">Share on LinkedIn</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </MaxWidthWrapper>
  );
}
