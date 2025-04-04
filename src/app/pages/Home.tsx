"use client";

import MaxWidthRappers from "@/components/MaxWidthRapper";
import { Button } from "@/components/ui/button";
import type { TreeInfo } from "../../../type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useGetTreeInfoQuery } from "../Featuers/Tree/TreeServices";
import Loading from "../Loading/Loading";
import { Droplets, ShoppingBag, Wind, Sun } from "lucide-react";
import { motion } from "framer-motion";
import PopupModal from "../Components/Pop_up";
import { TreeCard } from "@/components/tree-card";
import { ScrollSection } from "@/components/scroll-section";
// import { SunIcon } from "@radix-ui/react-icons";

export const metadata = {
  title: "Vanagrow - Grow Your Green Space",
  description:
    "Buy plants and grow your green space with Vanagrow. Quality plants and easy delivery.",
  keywords: "plants, buy plants, online plant shop, garden",
  openGraph: {
    title: "Vanagrow - Plant Shop",
    description:
      "Discover a variety of plants at Vanagrow and get them delivered to your home.",
  },
};

const Homes = () => {
  const { data: feature, isLoading, isError } = useGetTreeInfoQuery();

  if (isLoading) {
    return <Loading />;
  }

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
    <MaxWidthRappers className="xl:max-w-screen-lg sm:max-w-screen-sm md:max-w-screen-md mx-auto">
      <header className="p-4">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center relative overflow-hidden"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/dn633knvv/image/upload/v1737000554/a-vibrant-and-inspiring-illustration-for_qXHSuMslRfWKyMK81sGlLw_GDZNoVguQgql8AfcnuBVUw_rtl11b.jpg")',
          }}
          aria-labelledby="hero-heading"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-2"
              >
                <h1
                  id="hero-heading"
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                >
                  Grow Your Own Forest
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Transform your landscape with our wide selection of
                  high-quality trees.
                </p>
              </motion.div>
              <PopupModal />
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-x-4"
              >
                <Button
                  asChild
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Link href="/Tree/Shop">Shop Now</Link>
                </Button>
                <Button
                  asChild
                  variant="default"
                  className="border-white text-white hover:text-white hover:bg-green-800"
                >
                  <Link href="/Tree/Learnmore">Learn More </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <ScrollSection title="Why plant trees?">
          {feature &&
            feature.map((tree: TreeInfo, index: number) => (
              <TreeCard key={tree._id} tree={tree} index={index} />
            ))}
        </ScrollSection>

        <ScrollSection title="Featured trees">
          {feature &&
            feature.map((tree: TreeInfo, index: number) => (
              <TreeCard
                key={tree._id}
                tree={tree}
                index={index}
                showPrice={true}
              />
            ))}
        </ScrollSection>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-10 py-20 flex flex-col justify-center items-center gap-8 bg-background rounded-lg shadow-inner my-10"
        >
          <div className="text-center">
            <h2 className="text-4xl font-extrabold font-['Plus Jakarta Sans'] leading-10 text-green-800">
              Ready to make a difference?
            </h2>
          </div>
          <div className="w-full flex justify-center">
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
            >
              <Link href="/Tree/Shop">Shop Plants</Link>
            </Button>
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
          aria-labelledby="benefits-heading"
        >
          <div className="container px-4 md:px-6">
            <h2
              id="benefits-heading"
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-green-800"
            >
              Benefits of Planting Trees
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  icon: Wind,
                  title: "Improve Air Quality",
                  description:
                    "Trees absorb pollutants and release clean oxygen into the atmosphere.",
                },
                {
                  icon: Droplets,
                  title: "Conserve Water",
                  description:
                    "Trees reduce runoff by breaking rainfall and allowing water absorption.",
                },
                {
                  icon: Sun,
                  title: "Energy Savings",
                  description:
                    "Strategically placed trees can cut your cooling costs significantly.",
                },
                {
                  icon: ShoppingBag,
                  title: "Increase Property Value",
                  description:
                    "Well-maintained trees can add up to 15% to your property value.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4" aria-hidden="true">
                    <item.icon className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-green-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col bg-background p-8 rounded-lg shadow-lg my-10"
        >
          <div className="mb-6">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-green-800">
              Why choose GreenFuture?
            </h2>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  What are the benefits of GreenFuture?
                </AccordionTrigger>
                <AccordionContent>
                  GreenFuture provides a wide range of benefits, including
                  reducing carbon footprint, enhancing biodiversity, and
                  promoting sustainable living.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  How does GreenFuture support the environment?
                </AccordionTrigger>
                <AccordionContent>
                  GreenFuture supports the environment through various
                  initiatives such as tree planting, conservation projects, and
                  promoting eco-friendly practices.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How can I get involved?</AccordionTrigger>
                <AccordionContent>
                  You can get involved by participating in our programs,
                  volunteering, or donating to support our cause. Visit our
                  website for more information on how to get started.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </motion.div>
      </header>
    </MaxWidthRappers>
  );
};

export default Homes;
