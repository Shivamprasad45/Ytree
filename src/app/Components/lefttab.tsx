"use client";
import { LogOut, TreePalm, User2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const Lefttab = () => {
  return (
    <div className="hidden md:flex flex-col px-2 border h-full">
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
  );
};

export default Lefttab;
