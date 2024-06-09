"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "@radix-ui/react-icons";
import { PalmtreeIcon } from "lucide-react";
const Navbar = () => {
  return (
    <nav className="max-w-screen-2xl px-3 md:px-8 font-semibold flex items-center justify-between py-4  md:py-6">
      <Link href={"/"}>
        <div className="flex space-x-2 text-xl">
          <span>
            <PalmtreeIcon />
          </span>
          <span>GreenFeauter</span>
        </div>
      </Link>
      <div className="flex space-x-32 items-center ">
        <div className="space-x-10 hidden md:inline">
          <span className="">About</span>

          <Link href="/Tree/Shop">
            <span className=" cursor-pointer"> Shop </span>
          </Link>

          <span className="">Get Involved</span>
        </div>
        <div className="space-x-1">
          <Button>Denote</Button>
          <Button variant={"secondary"}>Login</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
