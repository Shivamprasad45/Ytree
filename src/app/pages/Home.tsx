"use client";

import MaxWidthRappers from "@/components/MaxWidthRapper";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useGetTreeInfoQuery } from "../Featuers/Tree/TreeServices";
import Loading from "../Loading/Loading";
import {
  Droplets,
  ShoppingBag,
  Wind,
  Sun,
  Users,
  Gift,
  Share2,
  MapPin,
  Clock,
  Home,
  PlayCircle,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import PopupModal from "../Components/Pop_up";
import { useReferelMutation } from "../Featuers/TreeOrder/TreeOrderServices";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useState, useEffect } from "react";

export const metadata = {
  title: "Vanagrow - Plant Trees Without Limits",
  description:
    "No space? No time? No problem. Plant and care for trees effortlessly with Vanagrow, even if you don't have a yard.",
  keywords:
    "tree planting, remote tree care, small space gardening, sustainable living",
  openGraph: {
    title: "Vanagrow - Plant Trees Without Limits",
    description:
      "Join our mission to make the world greener, even if you don't have the space or time to do it yourself.",
  },
};

const Homes = () => {
  const { data: feature, isLoading, isError } = useGetTreeInfoQuery();
  const [referralStats, setReferralStats] = useState({
    totalReferred: 0,
    rewards: 0,
  });
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [
    Grf,
    {
      data: Refrel,
      isLoading: isRefrelLoading,
      isSuccess: isRefrelSuccess,
      reset,
    },
  ] = useReferelMutation();

  // Handle Instagram video modal
  const openInstagramVideo = () => {
    window.open(
      "https://www.instagram.com/reel/DI2ZetmTApE/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "_blank"
    );
  };

  useEffect(() => {
    // Instagram embed API script
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const progressPercentage = Math.min(
    (referralStats.totalReferred / 10) * 100,
    100
  );

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p>Failed to fetch tree information. Please try again later.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <MaxWidthRappers className="w-full max-w-full px-4 sm:px-6 md:max-w-screen-md lg:max-w-screen-lg mx-auto overflow-hidden">
      <header className="p-2 sm:p-4">
        {/* Hero Section with Updated Messaging */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full py-8 md:py-16 lg:py-24 xl:py-32 bg-cover bg-center relative overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Video background */}
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              className="w-full h-full object-cover"
              src="https://www.youtube.com/embed/es4x5R-rV9s?autoplay=1&mute=0&loop=1&playlist=es4x5R-rV9s&controls=0&showinfo=0&modestbranding=1"
              title="YouTube video background"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <div className="absolute inset-0 bg-black bg-opacity-60" />
          </div>

          {/* Content above video */}
          <div className="container px-4 relative z-10">
            <div className="flex flex-col items-center space-y-6 text-center text-white">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-4"
              >
                <h1
                  id="hero-heading"
                  className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl"
                >
                  No Space? No Time? No Problem.
                </h1>
                <p className="mx-auto max-w-full sm:max-w-[700px] text-sm md:text-base lg:text-xl text-gray-200">
                  Plant trees and make the world greener, even if you don&#39;t
                  have a yard or the time to care for them yourself.
                </p>
              </motion.div>
              <PopupModal />
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-3 sm:space-x-4"
              >
                <Button
                  asChild
                  className="bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base"
                >
                  <Link href="/Tree/Shop">Plant a Tree Now</Link>
                </Button>
                <Button
                  asChild
                  variant="default"
                  className="border-white text-white hover:text-white hover:bg-green-800 text-sm sm:text-base"
                >
                  <Link href="/Tree/Learnmore">How It Works</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Featured Video Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full py-8 md:py-12 bg-background"
        >
          <div className="container px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-green-800">
                See How It Works
              </h2>
              <p className="text-gray-600 mt-2">
                Watch how we&#39;re making tree planting accessible for everyone
              </p>
            </div>

            <div className="relative mx-auto max-w-2xl overflow-hidden rounded-xl shadow-lg">
              {/* Video Thumbnail and Play Button */}
              <div className="relative aspect-video bg-gray-100 flex justify-center items-center">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/api/placeholder/640/360')`,
                    filter: "brightness(0.8)",
                  }}
                />
                <Button
                  onClick={openInstagramVideo}
                  variant="ghost"
                  size="lg"
                  className="relative z-10 hover:bg-green-600/70 hover:scale-105 transition-all"
                >
                  <PlayCircle className="h-16 w-16 text-white" />
                </Button>
              </div>

              {/* Instagram Content Link */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-green-800">
                    Tree Planting Made Simple
                  </h3>
                  <p className="text-sm text-gray-600">
                    See the impact of our community&#39;s efforts
                  </p>
                </div>
                <Button
                  onClick={openInstagramVideo}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-green-700 hover:text-green-800 hover:bg-green-100"
                >
                  <span>Watch on Instagram</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* "How We Solve Your Problems" Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full py-8 md:py-12 bg-background"
          aria-labelledby="solutions-heading"
        >
          <div className="container px-4">
            <h2
              id="solutions-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tighter text-center mb-8 text-green-800"
            >
              Plant Trees Without Limitations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Home,
                  title: "No Space Required",
                  description:
                    "We plant and maintain trees in dedicated lands on your behalf. No yard or garden needed.",
                },
                {
                  icon: Clock,
                  title: "No Time Commitment",
                  description:
                    "Our experts handle all care and maintenance. You get updates without the work.",
                },
                {
                  icon: MapPin,
                  title: "Plant Anywhere",
                  description:
                    "Choose where your trees grow—from urban areas to conservation hotspots.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center p-6 bg-green-50 dark:bg-green-900/10 rounded-lg shadow-sm"
                >
                  <div
                    className="mb-4 bg-green-100 dark:bg-green-800/30 p-3 rounded-full"
                    aria-hidden="true"
                  >
                    <item.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-green-800">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* "How It Works" Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="my-10"
        >
          <Card className="border-2 border-green-100 dark:border-green-900/30">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Gift className="h-5 w-5 text-green-600" />
                Simple Steps to Make a Difference
              </CardTitle>
              <CardDescription>
                How to plant trees effortlessly through our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 mb-4">
                    <ShoppingBag className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium mb-2">1. Choose Your Trees</h3>
                  <p className="text-sm text-muted-foreground">
                    Select tree species and planting locations that match your
                    preferences
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 mb-4">
                    <Sun className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium mb-2">2. We Plant & Care</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team plants your trees and provides expert ongoing care
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 mb-4">
                    <Droplets className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium mb-2">3. Track Your Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive updates and see how your trees are helping the
                    planet
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full py-8 md:py-16 bg-background"
          aria-labelledby="benefits-heading"
        >
          <div className="container px-4">
            <h2
              id="benefits-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tighter text-center mb-6 text-green-800"
            >
              Why Plant Trees With Us?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Wind,
                  title: "Improve Air Quality",
                  description:
                    "Your trees absorb pollutants and release clean oxygen into the atmosphere.",
                },
                {
                  icon: Droplets,
                  title: "Fight Climate Change",
                  description:
                    "Each tree captures carbon and helps mitigate global warming effects.",
                },
                {
                  icon: Users,
                  title: "Build Community",
                  description:
                    "Join thousands making a difference together, without needing their own land.",
                },
                {
                  icon: Gift,
                  title: "Create Your Legacy",
                  description:
                    "Trees you plant today will benefit generations to come.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center p-3"
                >
                  <div className="mb-3" aria-hidden="true">
                    <item.icon className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-green-800">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Referral Program */}
        <Card className="overflow-hidden border-2 border-green-100 dark:border-green-900/30 my-8">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Grow Our Forest Together
              </CardTitle>
              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <CardDescription>
              Refer friends and earn free trees for your virtual forest
            </CardDescription>
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
            <div className="flex justify-center mt-6">
              <Button className="bg-green-600 hover:bg-green-700">
                Share Your Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col bg-background p-4 sm:p-6 md:p-8 rounded-lg shadow-lg my-8"
        >
          <div className="mb-6">
            <h2 className="scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight text-green-800">
              Frequently Asked Questions
            </h2>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm sm:text-base">
                  How do I plant trees if I live in an apartment?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base">
                  Our platform lets you fund tree planting in dedicated
                  locations around the world. You select the trees and
                  locations, and our team handles the planting and care.
                  You&#39;ll receive updates about your trees&#39; growth and
                  impact.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm sm:text-base">
                  How do I know my trees are really being planted?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base">
                  We provide photo verification of your planted trees and
                  regular growth updates. Each tree has a unique identifier, and
                  you can track its progress through our app or website.
                  We&#39;re fully transparent about our planting operations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm sm:text-base">
                  What happens if my tree doesn&#39;t survive?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base">
                  We guarantee the trees we plant for at least three years. If a
                  tree fails to thrive during this period, we&#39;ll replace it
                  at no additional cost. Our expert team selects species
                  appropriate for each location to maximize survival rates.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-sm sm:text-base">
                  Can I gift trees to someone else?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base">
                  Absolutely! Trees make meaningful , sustainable gifts. When
                  checking out, select the &quot;Gift&quot; option and provide
                  the recipient&#39;s details. They&#39;ll receive a beautiful
                  digital certificate and access to track their tree&#39;s
                  growth.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-4 sm:px-8 py-12 sm:py-16 flex flex-col justify-center items-center gap-6 bg-green-50 dark:bg-green-900/10 rounded-lg shadow-inner my-8"
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Plus Jakarta Sans'] leading-tight text-green-800">
              Start greening the planet today
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Join thousands of people making a difference without the space or
              time constraints of traditional tree planting.
            </p>
          </div>
          <div className="w-full flex justify-center">
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
            >
              <Link href="/Tree/Shop">Plant Your First Tree</Link>
            </Button>
          </div>
        </motion.div>
      </header>
    </MaxWidthRappers>
  );
};

export default Homes;
