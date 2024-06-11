"use client";
import Navbar from "@/app/Components/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
import {
  TreeDetailSelector,
  fetchPlantDetails,
} from "@/app/Featuers/Tree/TreeSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import Lefttab from "@/app/Components/lefttab";
import { AppDispatch } from "@/app/Store/ConfigStore";

const Page = ({ params }: { params: { id: string } }) => {
  const dispatch: AppDispatch = useDispatch();

  const PlantDetails = useSelector(TreeDetailSelector);
  console.log(PlantDetails, "Plant details");
  useEffect(() => {
    dispatch(fetchPlantDetails(params.id) as any);
  }, [dispatch, params.id]);

  return (
    <div className=" flex flex-row">
      {/* //Left */}

      {/* //Middle? */}
      <div className="font-sans tracking-wide max-md:mx-auto mb-8 ">
        <div className=" md:min-h-[600px] grid items-start grid-cols-1 lg:grid-cols-5 md:grid-cols-2 gap-2">
          <div className="lg:col-span-3 h-full items-start">
            <div className="mx-2 relative h-full flex  ">
              <Image
                src="https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                alt="Product"
                className="lg:w-4/5 w-full h-full rounded-xl object-contain"
                width={400}
                height={400}
              />

              <div className="flex space-x-5 items-end absolute right-0 max-md:right-4 md:bottom-4 bottom-0">
                <div className="bg-white w-10 h-10 grid items-center justify-center rounded-full rotate-90 shrink-0 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 fill-[#333] inline"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                      clip-rule="evenodd"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
                <div className="bg-[#333] w-10 h-10 grid items-center justify-center rounded-full -rotate-90 shrink-0 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 fill-[#fff] inline"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                      clip-rule="evenodd"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2  py-6 px-8 h-full">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {PlantDetails?.commonName}
              </h2>

              <div className="flex space-x-2 mt-2">
                <svg
                  className="w-4 fill-gray-800"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-4 fill-gray-800"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-4 fill-gray-800"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-4 fill-gray-800"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-4 fill-[#CED5D8]"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Price</h3>
              <p className="text-gray-800 text-3xl font-bold">
                ₹{PlantDetails?.prise}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800">Quantity</h3>
              <div className="flex border w-max mt-4 rounded overflow-hidden space-x-2 items-start justify-center">
                <Button size={"icon"}>
                  <Plus />
                </Button>
                <span>1</span>
                <Button size={"icon"}>
                  <Minus />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Button>Buy now</Button>
              <Button>Add to cart</Button>
            </div>

            <div className="flex flex-wrap items-center text-sm text-gray-800 mt-8 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current w-6 mr-3"
                viewBox="0 0 48 48"
              >
                <path d="M15.5 33.3h19.1v2H15.5z" data-original="#000000" />
                <path
                  d="M45.2 35.3H43v-2h2.2c.4 0 .8-.4.8-.8v-9.1c0-.4-.3-.6-.5-.7l-3.2-1.3c-.3-.2-.8-.5-1.1-1l-6.5-10c-.1-.2-.4-.3-.7-.3H2.8c-.4 0-.8.4-.8.8v21.6c0 .4.4.8.8.8h3.9v2H2.8C1.3 35.3 0 34 0 32.5V10.9c0-1.5 1.3-2.8 2.8-2.8h31.3c1 0 1.9.5 2.4 1.3l6.5 10 .4.4 2.9 1.2c1.1.5 1.7 1.4 1.7 2.5v9.1c0 1.4-1.3 2.7-2.8 2.7z"
                  data-original="#000000"
                />
                <path
                  d="M26.5 21H3.9v-9.4h22.6zM5.9 19h18.6v-5.4H5.9zm32.9 2H27.9v-9.4h6.3zm-8.9-2h5.7L33 13.6h-3.1zm-19 20.9c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6zm27.9 9.2c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6z"
                  data-original="#000000"
                />
              </svg>
              Free delivery on order ₹100
            </div>

            <div className="mt-6 hidden md:inline ">
              <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                Product Description
              </h3>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                {PlantDetails?.description}
              </p>
            </div>
            <div className="mt-10 max-w-2xl px-6">
              <h3 className="text-lg font-bold text-gray-800">About tree</h3>
              <ul className="grid grid-cols-2 gap-3 mt-4">
                <li className="flex items-center text-sm text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Region</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <span>{PlantDetails?.region}</span>
                    </PopoverContent>
                  </Popover>
                </li>
                <li className="flex items-center text-sm text-gray-800">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">growthRequirements</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <span>{PlantDetails?.growthRequirements}</span>
                    </PopoverContent>
                  </Popover>
                </li>
                <li className="flex items-center text-sm text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">benefits</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="p-3 grid grid-flow-row ">
                        {PlantDetails?.benefits.map((item, index) => (
                          <span key={index}>
                            <Badge>{item}</Badge>
                          </span>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </li>
                <li className="flex items-center text-sm text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">scientificName</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <span>{PlantDetails?.scientificName}</span>
                    </PopoverContent>
                  </Popover>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 max-w-2xl px-6">
          <div className="mt-6 inline md:hidden ">
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              Product Description
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              {PlantDetails?.description}
            </p>
          </div>
        </div>
        <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <h3 className="text-lg font-bold text-[#333]">Reviews(10)</h3>
          <div className="grid md:grid-cols-2 gap-12 mt-6">
            <div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <p className="text-sm text-[#333] font-bold">5.0</p>
                  <svg
                    className="w-5 fill-[#333] ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className="w-2/3 h-full rounded bg-[#333]"></div>
                  </div>
                  <p className="text-sm text-[#333] font-bold ml-3">66%</p>
                </div>

                <div className="flex items-center">
                  <p className="text-sm text-[#333] font-bold">4.0</p>
                  <svg
                    className="w-5 fill-[#333] ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className="w-1/3 h-full rounded bg-[#333]"></div>
                  </div>
                  <p className="text-sm text-[#333] font-bold ml-3">33%</p>
                </div>

                <div className="flex items-center">
                  <p className="text-sm text-[#333] font-bold">3.0</p>
                  <svg
                    className="w-5 fill-[#333] ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className="w-1/6 h-full rounded bg-[#333]"></div>
                  </div>
                  <p className="text-sm text-[#333] font-bold ml-3">16%</p>
                </div>

                <div className="flex items-center">
                  <p className="text-sm text-[#333] font-bold">2.0</p>
                  <svg
                    className="w-5 fill-[#333] ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className="w-1/12 h-full rounded bg-[#333]"></div>
                  </div>
                  <p className="text-sm text-[#333] font-bold ml-3">8%</p>
                </div>

                <div className="flex items-center">
                  <p className="text-sm text-[#333] font-bold">1.0</p>
                  <svg
                    className="w-5 fill-[#333] ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className="w-[6%] h-full rounded bg-[#333]"></div>
                  </div>
                  <p className="text-sm text-[#333] font-bold ml-3">6%</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <img
                  src="https://readymadeui.com/team-2.webp"
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div className="ml-3">
                  <h4 className="text-sm font-bold text-[#333]">John Doe</h4>
                  <div className="flex space-x-1 mt-1">
                    <svg
                      className="w-4 fill-[#333]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 fill-[#333]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 fill-[#333]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 fill-[#CED5D8]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 fill-[#CED5D8]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <p className="text-xs !ml-2 font-semibold text-[#333]">
                      2 mins ago
                    </p>
                  </div>
                  <p className="text-sm mt-4 text-[#333]">
                    Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                    eiusmod tempor incidunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-[#333] text-[#333] font-bold rounded">
                    Read all reviews
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <ScrollArea className="h-72 w-48 rounded-md border">
                    <div className="p-4">
                      <h4 className="mb-4 text-sm font-medium leading-none">
                        Tags
                      </h4>
                      {tags.map((tag) => (
                        <>
                          <div key={tag} className="text-sm">
                            {tag}
                          </div>
                          <Separator className="my-2" />
                        </>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
