"use client";
import Paginations from "@/app/Components/Paginations";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { TreeInfo } from "../../../../../type";
import Link from "next/link";

import Image from "next/image";
// import { useGetuserInfoByNameQuery } from "../../Auth/AuthAPIS";
import Loading from "@/app/Loading/Loading";
import { useSelector } from "react-redux";
import { UserSelector } from "../../Auth/AuthSlice";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const fetchTreeInfo = async () => {
  const response = await axios.get("/api/Tree/AllTree");
  return response.data;
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

  console.log(user?.Username, "user");
  if (isError) {
    return <p>Error: Failed to fetch tree information</p>;
  }
  return (
    <>
      <MaxWidthRappers>
        <div className="font-sans px-4 py-8">
          <div className="">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
              {feature &&
                feature.map((product: TreeInfo) => (
                  <div
                    key={product.id}
                    className="group relative max-h-[600px]"
                  >
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <Image
                        src="https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                        alt="product1"
                        width={400}
                        height={400}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between h-[150px]">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <Link href={`/TreeDetiles/${product._id}`}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.commonName}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.scientificName.slice(0, 20)}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 pt-2">
                          {product.description.slice(0, 50)}
                        </p>
                      </div>
                      <p className="text-sm font-medium pl-2 text-gray-300 pt-6">
                        ₹{product.prise}
                      </p>
                    </div>
                    <Button className="flex items-center text-center justify-center mb-0 space-x-2 mt-4">
                      <p>
                        <Truck />
                      </p>
                      <div className=" ">Delivery free</div>
                    </Button>
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
