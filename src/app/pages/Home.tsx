"use client";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { TreeInfo } from "../../../type";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useGetTreeInfoQuery } from "../Featuers/Tree/TreeServices";

import Loading from "../Loading/Loading";
import Image from "next/image";

import { useSession } from "next-auth/react";
const Homes = () => {
  const { data: feature, isLoading, isError } = useGetTreeInfoQuery();

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
      <MaxWidthRappers className="xl:max-w-screen-lg sm:max-w-screen-sm md:max-w-screen-md mx-3">
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
                  <Button className="">
                    <Link href="/Tree/Shop">Shop plant</Link>
                  </Button>
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
            <div className="w-full items-center flex  justify-center my-4">
              <ScrollArea className="w-full md:w-[70vw] whitespace-nowrap rounded-md ">
                <div className="flex w-max space-x-4 p-4">
                  {feature &&
                    feature.map((artwork: TreeInfo) => (
                      <div
                        key={artwork._id}
                        className="Depth7Frame0 w-56 h-60 flex-col justify-start items-start gap-3 inline-flex"
                      >
                        <Link href={`/TreeDetiles/${artwork._id}`}>
                          <div className="Depth8Frame0 h-32 flex-col justify-start items-start flex">
                            <Image
                              height={200}
                              width={400}
                              className="w-56 h-32 relative rounded-xl"
                              src="https://via.placeholder.com/223x125"
                              alt="img "
                            />
                          </div>
                          <div className="Depth8Frame1 w-56 h-24 pb-3 flex-col justify-start items-start flex">
                            <div className="Depth9Frame0 w-56 h-6 flex-col justify-start items-start flex">
                              <div className="CoolTheEarth self-stretch text-neutral-900 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                                {artwork.commonName}
                              </div>
                            </div>
                            <div className="Depth9Frame1 w-56 relative h-16 flex-col justify-start items-start flex">
                              <div className="Tr self-stretch text-wrap   text-neutral-500 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                                {artwork.description.slice(0, 120)}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </section>
          {/* //Feature tree */}
          <section className="my-10 md:my-14">
            <div className="items-start flex flex-col text-start">
              <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Features trees
              </h1>
            </div>
            <div className="w-full items-center flex  justify-center my-4">
              <ScrollArea className="w-full md:w-[70vw] whitespace-nowrap rounded-md ">
                <div className="flex w-max space-x-4 p-4">
                  {feature &&
                    feature.map((artwork: TreeInfo) => (
                      <div
                        key={artwork._id}
                        className="Depth5Frame3 w-56 h-48 flex-col justify-start items-start gap-3 inline-flex"
                      >
                        <Link href={`/TreeDetiles/${artwork._id}`}>
                          <div className="Depth6Frame0 w-56 h-32 flex-col justify-start items-start flex">
                            <Image
                              height={200}
                              width={400}
                              className="w-56 h-32 relative rounded-xl"
                              src="https://via.placeholder.com/223x125"
                              alt="img "
                            />
                          </div>
                          <div className="Depth6Frame1 w-56 h-14 pb-3 flex-col justify-start items-start flex">
                            <div className="Depth7Frame0 w-56 h-6 flex-col justify-start items-start flex">
                              <div className="WhiteDogwood self-stretch text-neutral-900 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                                {artwork.commonName}
                              </div>
                            </div>
                            <div className="Depth7Frame1 w-56 h-5 flex-col justify-start items-start flex">
                              <div className="15 self-stretch text-neutral-500 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                                ${artwork.price}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            {/* //Ready to make diff */}
            <div className="px-10 py-20 flex flex-col justify-center items-center gap-8">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold  font-['Plus Jakarta Sans'] leading-10">
                  Ready to make a difference?
                </h1>
              </div>
              <div className="w-full flex justify-center">
                <Button className="">
                  <Link href="/Tree/Shop">Shop plant</Link>
                </Button>
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
