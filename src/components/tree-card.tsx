"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TreeInfo } from "../type";
// import type { TreeInfo } from "@/type"

interface TreeCardProps {
  tree: TreeInfo;
  index: number;
  showPrice?: boolean;
}

export function TreeCard({ tree, index, showPrice = false }: TreeCardProps) {
  return (
    <motion.div
      key={tree._id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="w-56 h-auto flex-col justify-start items-start gap-3 inline-flex"
    >
      <Link
        href={`/TreeDetiles/${tree._id}`}
        className="focus:outline-none focus:ring-2 focus:ring-green-600 rounded-xl"
      >
        <div className="h-32 flex-col justify-start items-start flex">
          <Image
            height={200}
            width={400}
            className="w-56 h-32 relative rounded-xl object-cover"
            src={tree.imageURL || "/placeholder.svg"}
            alt={tree.commonName}
            priority={index < 2} // Only prioritize loading for the first two images
          />
        </div>
        <div className="w-56 pb-3 flex-col justify-start items-start flex">
          <div className="w-full flex-col justify-start items-start flex">
            <h3 className="self-stretch text-neutral-900 text-base font-medium leading-normal">
              {tree.commonName}
            </h3>
          </div>
          {showPrice ? (
            <div className="w-full flex-col justify-start items-start flex">
              <p className="self-stretch text-neutral-500 text-sm font-normal leading-tight">
                ₹{tree.prise}
              </p>
            </div>
          ) : (
            <div className="w-full relative flex-col justify-start items-start flex">
              <p className="self-stretch line-clamp-2 text-neutral-500 text-sm font-normal leading-tight">
                {tree.description}
              </p>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
