"use client";
import Paginations from "@/app/Components/Paginations";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { TreeInfo } from "../../../../../type";
import Link from "next/link";

import Image from "next/image";
import { useGetuserInfoByNameQuery } from "../../Auth/AuthAPIS";
import Loading from "@/app/Loading/Loading";

const fetchTreeInfo = async () => {
  const response = await axios.get("/api/Tree/AllTree");
  return response.data;
};
const Shop = () => {
  const { data: userData } = useGetuserInfoByNameQuery();
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* {feature &&
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
                ))} */}

              {feature &&
                feature.map((product: TreeInfo) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <Image
                        src="https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                        alt="product1"
                        width={400}
                        height={400}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
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
                          {product.scientificName}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.prise}
                      </p>
                    </div>
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
