"use client";

import React, { useEffect } from "react";

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

import { MenuSquare, PalmtreeIcon, TreesIcon } from "lucide-react";
import { ModeToggle } from "./Togglemode";
import { Badge } from "@/components/ui/badge";
import { menuItems } from "./lefttab";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const route = usePathname();

  if (route === "/Auth/Login") {
    return (
      <>
        <div className=""></div>
      </>
    );
  }
  if (route === "/Auth/Signup") {
    return (
      <>
        <div className=""></div>
      </>
    );
  }
  return (
    <nav className="max-w-screen-2xl px-3 md:px-8 font-semibold flex items-center  justify-between py-3  md:py-4 border-b mb-2">
      <Link href={"/"}>
        <div className="flex space-x-2 text-sm md:text-lg">
          <span>
            <PalmtreeIcon />
          </span>
          <span>GreenFeauter</span>
        </div>
      </Link>
      <div className="flex space-x-32 items-center justify-center ">
        <div className=" hidden md:inline  ">
          <div className="justify-center items-center space-x-10 flex ">
            <span className="">About</span>

            <Link className="flex space-x-2" href="/Tree/Cart">
              <span className="relative">
                <Badge className="absolute bottom-4">3</Badge>
                <TreesIcon />
              </span>
              <span className="">Cart</span>
            </Link>
          </div>
        </div>
        <div className="space-x-1 flex">
          <ModeToggle />
          <NavigationMenu>
            <NavigationMenuItem className="md:hidden pl-8">
              <NavigationMenuTrigger>
                <MenuSquare />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className=" p-4 grid gap-4 ">
                  {menuItems.map((component) => (
                    <Link
                      className="text-sm"
                      key={component.id}
                      href={component.path}
                    >
                      <div className="flex space-x-1 items-center">
                        <span>{component.icon}</span>
                        <span>{component.label}</span>
                      </div>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
