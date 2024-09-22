"use client";

import React from "react";
import Image from "next/image";
import { useAbout_my_treeQuery } from "@/app/Featuers/TreeOrder/TreeOrderServices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useAbout_my_treeQuery(params.id!);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Thank you!</CardTitle>
          <p className="text-muted-foreground">
            Your order has been placed. You will receive email confirmation
            shortly.
          </p>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Certificate of Planting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Image
              src="https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
              width={100}
              height={100}
              className="rounded-md"
              alt="Plant"
            />
            <div>
              <h3 className="text-xl font-bold">Tree Planting Certificate</h3>
              <p className="text-muted-foreground">
                You have funded the planting of 10 trees
              </p>
              <p className="text-sm text-muted-foreground">
                Order: {data?._id}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Tree Location Details</h4>
            <div className="grid grid-cols-2 gap-4 border-t border-b py-4">
              <div>
                <p className="font-medium">Tree Type</p>
                <p className="text-muted-foreground">{data?.commonName}</p>
              </div>
              <div>
                <p className="font-medium">Planting Region</p>
                <p className="text-muted-foreground">{data?.Plant_Addresses}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <div>
              <p className="font-medium">GPS Coordinates</p>
              <p className="text-muted-foreground">
                {data?.long} {data?.late}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
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
            <Skeleton className="h-24 w-24 rounded-md" />
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
        </CardContent>
      </Card>
    </div>
  );
}
