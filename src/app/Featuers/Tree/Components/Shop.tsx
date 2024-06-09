"use client";
import Paginations from "@/app/Components/Paginations";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { TreeInfo } from "../../../../../type";
import Link from "next/link";
import { SkeletonCard } from "@/app/Components/Scelktion";
import Image from "next/image";
import Navbar from "@/app/Components/Navbar";
const fetchTreeInfo = async () => {
  const response = await axios.get("http://localhost:3000/api/Tree/AllTree");
  return response.data;
};
const Shop = () => {
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
      <MaxWidthRappers>
        <div>....Loading</div>
      </MaxWidthRappers>
    );
  }

  if (isError) {
    return <p>Error: Failed to fetch tree information</p>;
  }
  return (
    <>
      <Navbar />
      <MaxWidthRappers>
        <div className="font-sans px-4 py-8">
          <div className="">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {feature &&
                feature.map((item: TreeInfo) => (
                  <div
                    key={item._id}
                    className="bg-white p-2 cursor-pointer hover:scale-[1.03] transition-all"
                  >
                    <Link href={`/TreeDetiles/${item._id}`}>
                      <div className="w-full h-[130px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                        <Image
                          src="https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                          alt="product1"
                          width={400}
                          height={400}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="text-center mt-4">
                        <h3 className="text-sm font-semibold text-[#333]">
                          {item.commonName}
                        </h3>
                        <h4 className="text-lg text-gray-800 font-bold mt-2">
                          {item.prise}
                        </h4>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <Paginations />
      </MaxWidthRappers>
    </>
  );
};

export default Shop;
