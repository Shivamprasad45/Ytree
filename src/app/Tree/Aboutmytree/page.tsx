"use client";
import React from "react";
import Image from "next/image";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import { LogOut, TreePalm, User2 } from "lucide-react";

const page = () => {
  return (
    <MaxWidthRappers>
      <div className="flex flex-col md:flex-row justify-between overflow-hidden relative md:justify-start items-start min-h-screen py-2">
        {/* Left */}
        <div className="hidden md:flex flex-col px-2 border h-full min-h-screen">
          <div className="flex items-center font-semibold justify-between min-w-60 mb-6">
            <Image
              width={100}
              height={100}
              src="https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
              className="rounded-full w-12 h-12 hover:border-2 border-black"
              alt="profile picture"
            />
            <span className="text-lg">Shivam</span>
          </div>
          <div className="flex flex-col gap-12 items-start mt-32">
            <p className="flex space-x-16 items-center hover:text-blue-500 hover:bg-gray-100 cursor-pointer p-2 rounded">
              <TreePalm size={40} />
              <span className="text-xl">Tree</span>
            </p>
            <p className="flex space-x-16 items-center hover:text-blue-500 hover:bg-gray-100 cursor-pointer p-2 rounded">
              <LogOut size={40} />
              <span className="text-xl">Logout</span>
            </p>
            <p className="flex space-x-16 items-center hover:text-blue-500 hover:bg-gray-100 cursor-pointer p-2 rounded">
              <User2 size={40} />
              <span className="text-xl">User</span>
            </p>
          </div>
        </div>

        <div className="w-full max-w-2xl ml-8">
          {/* Thank You Note */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-4xl font-bold">Thank you!</h1>
            <p className="text-sm md:text-base">
              Your order has been placed. You will receive email confirmation
              shortly.
            </p>
          </div>

          {/* Certificate of Planting */}
          <div className="mb-6">
            <h2 className="text-xl md:text-3xl font-semibold">
              Certificate of Planting
            </h2>
          </div>

          {/* Plant Image */}
          <div className="flex  mb-6">
            <Image
              src="https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
              width={150}
              height={150}
              className="rounded-md"
              alt="Plant"
            />
          </div>

          {/* Tree Planting Certificate */}
          <div className="mb-6 ">
            <h3 className="text-lg md:text-2xl font-bold">
              Tree Planting Certificate
            </h3>
            <p className="text-sm md:text-base">
              You have funded the planting of 10 trees
            </p>
            <p className="text-sm md:text-base">Order #12345678</p>
          </div>

          {/* Tree Location Details */}
          <div className="mb-6">
            <h4 className="text-lg md:text-2xl font-bold mb-4 ">
              Tree Location Details
            </h4>
            <div className="border-t border-b py-4">
              <div className="flex justify-between text-sm md:text-base">
                <span className="font-semibold">Tree Type</span>
                <span className="font-semibold">Planting Region</span>
              </div>
              <div className="flex justify-between text-sm md:text-base mt-2">
                <span>Pine</span>
                <span>Oregon, United States</span>
              </div>
            </div>
          </div>

          {/* GPS Coordinates */}
          <div className="mb-6">
            <p className="text-sm md:text-base font-semibold">
              GPS Coordinates
            </p>
            <p className="text-sm md:text-base">45.5231° N, 122.6765° W</p>
          </div>
        </div>
      </div>

      {/* Bottom Navbar for small screens */}
      <div className="mb-1 md:hidden fixed bottom-0 w-full bg-transparent z-10">
        <div className="flex justify-between p-4">
          <User2 size={30} />
          <TreePalm size={30} />
          <LogOut size={30} />
        </div>
      </div>
    </MaxWidthRappers>
  );
};

export default page;
