"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useAbout_my_treeQuery } from "@/app/Featuers/TreeOrder/TreeOrderServices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MapPin, Download, Leaf, Globe, Book, User } from "lucide-react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import Link from "next/link";

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

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 bg-gradient-to-br from-green-50 to-blue-50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-green-800">
              Thank you for your contribution!
            </CardTitle>
            <p className="text-muted-foreground">
              Your order has been placed. You will receive email confirmation
              shortly.
            </p>
          </CardHeader>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <Card className="overflow-hidden shadow-2xl" ref={certificateRef}>
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-800 text-white py-8">
            <CardTitle className="text-3xl font-bold text-center">
              Certificate of Planting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <Image
                  src={treeData?.imageURL!}
                  width={250}
                  height={250}
                  className="rounded-lg shadow-md object-cover"
                  alt="Planted Tree"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-2 shadow-lg">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-3xl font-bold text-green-800 mb-2">
                  Tree Planting Certificate
                </h3>
                <p className="text-xl text-green-700 font-semibold mt-2">
                  {treeData?.name
                    ? `Presented to: ${treeData.name}`
                    : "You have funded the planting of a tree"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Order ID: {treeData?.find_id}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl font-semibold text-green-800 border-b border-green-200 pb-2">
                Tree Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <p className="font-medium text-green-700 mb-1">Tree Type</p>
                  <p className="text-xl">
                    {treeData?.commonName || "Not specified"}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <p className="font-medium text-green-700 mb-1">
                    Planting Region
                  </p>
                  <p className="text-xl">{treeData?.Plant_Addresses}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white rounded-lg p-4 shadow-md">
              <MapPin className="h-8 w-8 text-green-600 mt-1" />
              <div>
                <p className="font-medium text-green-700">GPS Coordinates</p>
                <p className="text-xl">
                  {treeData?.long}, {treeData?.late}
                </p>
              </div>
            </div>

            {treeData?.description && (
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-center mb-2">
                  <Book className="h-6 w-6 text-green-600 mr-2" />
                  <p className="font-medium text-green-700">Description</p>
                </div>
                <p className="text-gray-700">{treeData.description}</p>
              </div>
            )}

            {treeData?.bio && (
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-center mb-2">
                  <User className="h-6 w-6 text-green-600 mr-2" />
                  <p className="font-medium text-green-700">Bio</p>
                </div>
                <p className="text-gray-700">{treeData.bio}</p>
              </div>
            )}

            {treeData?.relation && (
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-center mb-2">
                  <Link href={""} className="h-6 w-6 text-green-600 mr-2" />
                  <p className="font-medium text-green-700">Relation</p>
                </div>
                <p className="text-gray-700">{treeData.relation}</p>
              </div>
            )}

            <div className="text-center text-green-800 font-semibold">
              <Globe className="inline-block h-6 w-6 mr-2" />
              Thank you for contributing to a greener planet!
            </div>
          </CardContent>
        </Card>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={downloadCertificate}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            <Download className="mr-2 h-5 w-5" /> Download Certificate
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-full mt-2" />
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/2 mx-auto" />
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <Skeleton className="h-64 w-64 rounded-lg" />
            <div className="space-y-4 flex-1">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-40" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          </div>
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </CardContent>
      </Card>
      <Skeleton className="h-12 w-48 rounded-full mx-auto" />
    </div>
  );
}
