"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useAbout_my_treeQuery } from "@/app/Featuers/TreeOrder/TreeOrderServices";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MapPin, Download, Leaf, Globe, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";

export default function EnhancedCertificate({
  params,
}: {
  params: { id: string };
}) {
  const { data: treeData, isLoading } = useAbout_my_treeQuery(params.id!);
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current);
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "Tree_Planting_Certificate.png";
      link.click();
    }
  };

  const shareCertificate = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Tree Planting Certificate",
          text: "Check out my contribution to the planet!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API not supported in your browser");
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Card
            className="overflow-hidden rounded-2xl shadow-2xl"
            ref={certificateRef}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 z-0" />
            <CardContent className="relative z-10 p-8 space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-emerald-800 tracking-tight">
                  Certificate of Tree Planting
                </h1>
                <p className="text-emerald-600 font-medium">
                  A testament to your commitment to our planet
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="relative"
                >
                  {
                    <Image
                      src={
                        (treeData?.verifed && treeData?.imageURL) ||
                        "/placeholder.svg"
                      }
                      width={250}
                      height={250}
                      className="rounded-full shadow-lg object-cover border-4 border-emerald-500"
                      alt=" Planted Tree"
                    />
                  }
                  <div className="absolute -bottom-4 -right-4 bg-emerald-500 rounded-full p-3 shadow-lg">
                    <Leaf className="h-8 w-8 text-white" />
                  </div>
                </motion.div>
                <div className="flex-1 space-y-4">
                  <h2 className="text-3xl font-bold text-emerald-700">
                    {treeData?.name || "Tree Planting Supporter"}
                  </h2>
                  <p className="text-emerald-600 font-medium">
                    Order ID: {treeData?.find_id || "Unavailable"}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {treeData?.description ||
                      "Thank you for your contribution to a greener Earth. Your tree stands as a living testament to your commitment to environmental sustainability."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard
                  icon={MapPin}
                  title="Location"
                  content={`${treeData?.long}, ${treeData?.late}`}
                />
                <InfoCard
                  icon={Globe}
                  title="Plant Address"
                  content={treeData?.Plant_Addresses || "Global Impact"}
                />
              </div>

              <div className="bg-emerald-50 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-semibold text-emerald-700">
                  Tree Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailItem
                    title="Description"
                    content={treeData?.description}
                  />
                  <DetailItem title="Bio" content={treeData?.bio} />
                  <DetailItem title="Relation" content={treeData?.relation} />
                </div>
              </div>

              <div className="text-center text-emerald-700 font-medium">
                <Globe className="inline-block h-5 w-5 mr-2" />
                Your contribution is making waves in our ecosystem!
              </div>
            </CardContent>
          </Card>

          <motion.div
            className="mt-8 flex justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={downloadCertificate}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition transform hover:scale-105"
            >
              <Download className="mr-2 h-5 w-5" /> Download
            </Button>
            <Button
              onClick={shareCertificate}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition transform hover:scale-105"
            >
              <Share2 className="mr-2 h-5 w-5" /> Share
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  content,
}: {
  icon: React.ElementType;
  title: string;
  content: string;
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md flex items-center space-x-4">
      <Icon className="h-8 w-8 text-emerald-500" />
      <div>
        <h3 className="font-semibold text-emerald-700">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
}

function DetailItem({ title, content }: { title: string; content?: string }) {
  return (
    <div>
      <h4 className="font-medium text-emerald-600">{title}</h4>
      <p className="text-gray-700">{content || "Not available"}</p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Skeleton className="h-64 w-64 rounded-full" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-8 w-64 mx-auto" />
      </div>
    </div>
  );
}
