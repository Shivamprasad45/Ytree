"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import { useAbout_my_treeQuery } from "@/app/Featuers/TreeOrder/TreeOrderServices";
import Loading from "@/app/Loading/Loading";

const Page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, isError, refetch } = useAbout_my_treeQuery(
    params.id!
  );

  if (isLoading) {
    return (
      <div className="">
        <Loading />
      </div>
    );
  }

  return (
    <MaxWidthRappers>
      <div className="flex flex-col md:flex-row justify-between overflow-hidden relative md:justify-start items-start min-h-screen py-2">
        {/* Left */}

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
            <p className="text-sm md:text-base">Order :{data?._id}</p>
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
                <span>{data?.commonName}</span>
                <span>{data?.Plant_Addresses}</span>
              </div>
            </div>
          </div>

          {/* GPS Coordinates */}
          <div className="mb-6">
            <p className="text-sm md:text-base font-semibold">
              GPS Coordinates
            </p>
            <p className="text-sm md:text-base">
              {data?.long}
              {"  "}
              {data?.late}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navbar for small screens */}
    </MaxWidthRappers>
  );
};

export default Page;
