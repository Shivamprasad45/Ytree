"use client";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import axios from "axios";
import { TreeInfo } from "../../../type";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
const fetchTreeInfo = async () => {
  const response = await axios.get(
    `https://green-29u45vx8v-codewithharry35434gmailcoms-projects.vercel.app/api/TreeInfo`
  );
  return response.data;
};
const Homes = () => {
  const {
    data: feature,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["treeInfo"],
    queryFn: fetchTreeInfo,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: Failed to fetch tree information</p>;
  }
  return (
    <>
      <Navbar />
      <MaxWidthRappers>
        <header className="p-5 md:p-8">
          <section className=" ">
            <div className="Image  relative ">
              <div className="items-start  flex flex-col  absolute bottom-6  px-6 md:px-12 text-white ">
                <div className="">
                  <span className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Plant trees, save the planet
                  </span>
                </div>
                <div className="">
                  <span className="text-sm  items-start flex flex-col text-start">
                    The easiest way to fight climate change is to plant trees.
                    And we make it easy for you to do just that.
                  </span>
                </div>
                <div className="mt-4">
                  <Button className="">Shop plant</Button>
                </div>
              </div>
            </div>
          </section>
          {/* //Why trees */}

          <section className="my-10 md:my-14">
            <div className="items-start flex flex-col text-start">
              <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
                Why plants trees?
              </h1>
            </div>
            <div className="w-full items-center flex  justify-center my-8">
              <Carousel className="w-full max-w-full flex items-center justify-between">
                <CarouselContent className="-ml-1 ">
                  {feature &&
                    feature.map((data: TreeInfo) => (
                      <CarouselItem
                        key={data._id}
                        className="pl-1 md:basis-1/2 lg:basis-1/3"
                      >
                        <div className="p-1  ">
                          <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-60 h-80">
                            <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                              <Image
                                src="https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                                alt="card"
                                width={400}
                                height={400}
                              />
                            </div>
                            <div className="p-6">
                              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                {data.commonName}
                              </h5>
                              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                {data.description.slice(0, 30)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
              </Carousel>
            </div>
          </section>
          {/* //Feauter tree */}
          <section className="my-10 md:my-14">
            <div className="items-start flex flex-col text-start">
              <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Features trees
              </h1>
            </div>
            <div className="w-full items-center flex  justify-center my-8">
              <Carousel className="w-full max-w-full">
                <CarouselContent className="-ml-1 ">
                  {feature &&
                    feature.map((data: TreeInfo) => (
                      <CarouselItem
                        key={data.id}
                        className="pl-1 md:basis-1/2 lg:basis-1/3"
                      >
                        <Link href={`/TreeDetiles/${data._id}`}>
                          <div className="p-1  ">
                            <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                              <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                                <img
                                  src="https://img.freepik.com/free-vector/isolated-tree-white-background_1308-26130.jpg?w=740&t=st=1717546065~exp=1717546665~hmac=4076274d845a82e5eb7d422105fbf206958572cd3874f705d2f4cf98876f017e"
                                  alt="ui/ux review check"
                                />
                                <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                                <button
                                  className="!absolute  top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                  type="button"
                                >
                                  <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                                    </svg>
                                  </span>
                                </button>
                              </div>
                              <div className="p-6 ">
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                                    {data.commonName}
                                  </h5>
                                  <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      className="-mt-0.5 h-5 w-5 text-yellow-700"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clip-rule="evenodd"
                                      ></path>
                                    </svg>
                                    5.0
                                  </p>
                                </div>

                                <div className="flex flex-wrap w-full justify-center h-14  items-center mt-2 space-x-2 space-y-2">
                                  {data.benefits.map((item, index) => (
                                    <div className="flex-grow" key={index}>
                                      <Badge>{item}</Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </CarouselItem>
                    ))}
                </CarouselContent>
              </Carousel>
            </div>
            {/* //Ready to make diff */}
            <div className="px-10 py-20 flex flex-col justify-center items-center gap-8">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-neutral-900 font-['Plus Jakarta Sans'] leading-10">
                  Ready to make a difference?
                </h1>
              </div>
              <div className="w-full flex justify-center">
                <Button>Shop Trees</Button>
              </div>
            </div>

            {/* //Why chose green feature */}
            <div className="flex flex-col">
              <div className="">
                <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Why choose GreenFuture?
                </span>
              </div>
              <div className="">
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
                      initiatives such as tree planting, conservation projects,
                      and promoting eco-friendly practices.
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
            </div>
          </section>
        </header>
      </MaxWidthRappers>
    </>
  );
};

export default Homes;
