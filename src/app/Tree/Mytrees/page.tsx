"use client";

import MaxWidthRappers from "@/components/MaxWidthRapper";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LogOut, TreePalm, User2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { IPlantProfile } from "../../../../type";
import Link from "next/link";
import Lefttab from "@/app/Components/lefttab";
import axiosInstance from "@/lib/Baseurl";

const fetchTreeInfo = async () => {
  const response = await axiosInstance.get(`api/TreeInfo`);
  return response.data;
};

const Page = () => {
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
    <div>
      <MaxWidthRappers className="mt-3">
        <main className="flex flex-col md:flex-row justify-between overflow-hidden relative md:justify-start w-full h-[100vh]">
          {/* Left Sidebar */}

          {/* Main Content */}
          <div className="flex-1 p-4">
            {/* Profile Image for small screens */}
            <div className="md:hidden mb-6">
              <Image
                width={100}
                height={100}
                src="https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                className="rounded-full w-12 h-12 hover:border-2 border-black"
                alt="profile picture"
              />
            </div>
            {/* Your Trees Section */}
            <div className="pl-6">
              <div className="flex flex-col justify-start items-start mb-6">
                <div className="text-black text-4xl font-bold font-['Inria Sans'] leading-none">
                  Your trees
                </div>
                <div className="text-neutral-400 text-xl font-normal font-['Inria Sans'] leading-normal">
                  Let’s see how your trees are doing
                </div>
              </div>
              <div className="mt-6">
                <ScrollArea className="w-full md:w-[70vw] whitespace-nowrap rounded-md ">
                  <div className="flex w-max space-x-4 p-4">
                    {feature &&
                      feature.map((artwork: IPlantProfile) => (
                        <div
                          key={artwork._id}
                          className="w-32 h-44 flex flex-col justify-center items-start gap-2.5"
                        >
                          <Link href="/Tree/Aboutmytree">
                            <img
                              className="w-32 h-32 rounded-lg"
                              src="https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                              alt="Plant"
                            />
                            <div className="flex flex-col justify-center items-start gap-0.5">
                              <div className="text-black text-xl font-bold font-['Inria_Sans'] leading-normal">
                                {artwork.name}
                              </div>
                              <div className="text-neutral-400 text-sm font-bold font-['Inria_Sans'] leading-none">
                                {artwork.age} months old
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          </div>
          {/* Bottom Navbar for small screens */}
        </main>
      </MaxWidthRappers>
    </div>
  );
};

export default Page;
