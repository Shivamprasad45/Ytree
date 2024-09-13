"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import Loading from "@/app/Loading/Loading";
import { UserSelector } from "../../Auth/AuthSlice";
import { TreeInfo } from "../../../../../type";
import MaxWidthRappers from "@/components/MaxWidthRapper";

const fetchTreeInfo = async () => {
  const response = await axios.get("/api/Tree/AllTree");
  return response.data;
};

export default function Shop() {
  const user = useSelector(UserSelector);
  const {
    data: feature,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["treeInfo"],
    queryFn: fetchTreeInfo,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: Failed to fetch tree information</p>
      </div>
    );
  }

  return (
    <MaxWidthRappers>
      <div className="py-8 px-4 sm:px-6 lg:px-8 m-auto  max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Shop Trees</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {feature.map((product: TreeInfo) => (
            <Card
              key={product._id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link
                href={`/TreeDetiles/${product._id}`}
                className="block h-full"
              >
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                    alt={product.commonName}
                    width={300}
                    height={200}
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to favorites</span>
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-1 truncate">
                    {product.commonName}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2 truncate">
                    {product.scientificName}
                  </p>
                  <div className="flex items-center mb-2">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                      {product.benefits[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price}</span>
                    <Button variant="default" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                  <div className="mt-2 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < 4 ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">
                      (42)
                    </span>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </MaxWidthRappers>
  );
}
