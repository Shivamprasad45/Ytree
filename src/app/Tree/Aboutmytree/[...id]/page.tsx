"use client";

import React from "react";
import Image from "next/image";
import { useAbout_my_treeQuery } from "@/app/Featuers/TreeOrder/TreeOrderServices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Thermometer, Droplets, Wind } from "lucide-react";
import { motion } from "framer-motion";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useAbout_my_treeQuery(params.id!);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const weather = data?.lastWeatherState?.[0]?.weather?.[0];
  const main = data?.lastWeatherState?.[0]?.main;
  const temperatureInCelsius = main ? (main.temp - 273.15).toFixed(1) : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 bg-gradient-to-br from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-green-800">
              Thank you for your contribution!
            </CardTitle>
            <p className="text-muted-foreground">
              Your order has been placed. You will receive email confirmation
              shortly .
            </p>
          </CardHeader>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="overflow-hidden">
          <CardHeader className="bg-green-700 text-white">
            <CardTitle className="text-2xl font-semibold">
              Certificate of Planting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <Image
                src={"https://picsum.photos/id/27/200/300"}
                width={200}
                height={200}
                className="rounded-lg shadow-md"
                alt="Plant"
              />
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-green-800">
                  Tree Planting Certificate
                </h3>
                <p className="text-lg text-green-600 font-semibold mt-2">
                  You have funded the planting of 10 trees
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Order: {"1324WEet"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-green-800">
                Tree Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-green-200 py-4">
                <div>
                  <p className="font-medium text-green-700">Tree Type</p>
                  <p className="text-lg">{data?.commonName}</p>
                </div>
                <div>
                  <p className="font-medium text-green-700">Planting Region</p>
                  <p className="text-lg">{data?.Plant_Addresses}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <p className="font-medium text-green-700">GPS Coordinates</p>
                <p className="text-lg">
                  {data?.long}, {data?.late}
                </p>
              </div>
            </div>

            {weather && main && (
              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">
                  Current Weather Conditions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-700">Temperature</p>
                      <p className="text-lg">{temperatureInCelsius}°C</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-700">Humidity</p>
                      <p className="text-lg">{main.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wind className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-700">Weather</p>
                      <p className="text-lg">{weather.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-48 w-48 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-60" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <div className="grid grid-cols-2 gap-4 border-t border-b py-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <Skeleton className="h-40 w-full rounded-lg" />
        </CardContent>
      </Card>
    </div>
  );
}
