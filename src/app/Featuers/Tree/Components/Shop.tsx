"use client";
import Paginations from "@/app/Components/Paginations";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { TreeInfo } from "../../../../../type";
import Link from "next/link";

import Image from "next/image";

import Loading from "@/app/Loading/Loading";
import { useSelector } from "react-redux";
import { UserSelector } from "../../Auth/AuthSlice";
import { Heart, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";

const fetchTreeInfo = async () => {
  const response = await axios.get("/api/Tree/AllTree");
  return response.data;
};
const metadata: Metadata = {
  title: "Shop of Trees ",
  description: "All Trees in one page",
};
const Shop = () => {
  // const { data: userData } = useGetuserInfoByNameQuery();
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
      <div>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <p>Error: Failed to fetch tree information</p>;
  }
  return (
    <>
      <MaxWidthRappers>
        <div className="font-sans px-4 py-8">
          <div className="">
            <main className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {feature.map((product: TreeInfo) => (
                  <Card
                    key={product._id}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <Link href={`/TreeDetiles/${product._id}`}>
                      <div className="relative">
                        <Image
                          src="https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080
"
                          alt="Plant"
                          width={200}
                          height={400}
                          className="w-full h-64 object-cover"
                        />
                        <Button
                          variant="secondary"
                          className="absolute top-2 right-2 p-2 rounded-full"
                        >
                          <Heart size={20} />
                        </Button>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-1">
                          {product.commonName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {product.scientificName}
                        </p>
                        <div className="flex items-center mb-2">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {product.benefits[0]}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold">
                            {product.price}
                          </span>
                          <Button variant="default">Add to Cart</Button>
                        </div>
                        <div className="mt-2 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < 4 ? "text-yellow-400" : "text-gray-300"
                              }
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-600">
                            (42 reviews)
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </main>
          </div>
        </div>
        <Paginations />
      </MaxWidthRappers>
    </>
  );
};

export default Shop;
