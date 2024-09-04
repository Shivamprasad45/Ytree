"use client";

import React from "react";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  EarthIcon,
  EarthLockIcon,
  LucideMenu,
  ShoppingBasket,
  TreesIcon,
  UserX2Icon,
} from "lucide-react";
import { ModeToggle } from "./Togglemode";
import { Badge } from "@/components/ui/badge";
import { menuItems } from "./lefttab";
import { usePathname } from "next/navigation";

import { useSelector } from "react-redux";
import ConnectionStatus from "../lib/Connection";
import Image from "next/image";
import { UserSelector } from "../Featuers/Auth/AuthSlice";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useGetCartItemByIdQuery } from "../Featuers/Treecart/TreeServicesAPI";

const Navbar = () => {
  const user = useSelector(UserSelector);
  const { data: cartdata, isLoading: isCartLoading } = useGetCartItemByIdQuery(
    user?._id!
  );

  const route = usePathname();

  if (["/Signup", "/login", "/Resend"].includes(route)) {
    return null; // No sidebar on these routes
  }
  const Total_cart_item = cartdata?.reduce((a, b) => a + b.quantity, 0);
  return (
    <nav className="max-w-screen-2xl px-3 md:px-8 font-semibold flex items-center  justify-between py-3  md:py-4 border-b mb-2">
      <ConnectionStatus />
      <Link href={"/"}>
        <div className="flex items-center justify-center space-x-2 text-sm md:text-lg">
          <span>
            <Image
              height={300}
              width={400}
              alt="https://i.postimg.cc"
              src="https://i.postimg.cc/cHCpYFRM/plant2.png"
              className="w-10 h-8 "
            />
          </span>
          <div className="text-container">
            <span className="letter">Y</span>
            <span className="letter">p</span>
            <span className="letter">l</span>
            <span className="letter">a</span>
            <span className="letter">n</span>
            <span className="letter">t</span>
          </div>
        </div>
      </Link>
      <div className="flex space-x-32 items-center justify-center ">
        <div className=" hidden md:inline  ">
          <div className="justify-center items-center space-x-10 flex ">
            <span className="cursor-auto">
              <Link href="/About">About</Link>
            </span>

            <Link className="flex space-x-2" href="/Tree/Cart">
              <span className="relative">
                <Badge className="absolute bottom-4">{Total_cart_item}</Badge>
                <TreesIcon />
              </span>
              <span className="">Cart</span>
            </Link>
            {user?.email ? (
              <div className="">
                <Button onClick={() => signOut()}>Logout</Button>
              </div>
            ) : (
              <div className="">
                <Link href="/login">
                  <Button>Sigin</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="space-x-2 flex items-center   ">
          <ModeToggle />
          <div className="flex space-x-2 items-center md:hidden">
            <Link href="/Tree/Mytrees">
              <EarthLockIcon className="hover:text-gray-400" />
            </Link>
            <Link href="/Tree/Cart">
              <ShoppingBasket className="hover:text-gray-400" />
            </Link>
            {user?.email === null && <UserX2Icon />}

            <Sheet>
              <SheetTrigger>
                {" "}
                <LucideMenu />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <div className="">
                    <Link href="/Tree/Global">
                      {" "}
                      <EarthIcon />{" "}
                    </Link>
                  </div>
                  <div className="">
                    <Link href="/About"> About</Link>
                  </div>
                  <ul className=" pt-4 grid  ">
                    {menuItems.map((item) => (
                      <Link key={item.id} href={item.path}>
                        <p
                          className={`flex space-x-16 ${
                            item.id === 6 ? "hidden" : ""
                          }  items-center min-w-40 hover:text-blue-500 hover:bg-gray-100 cursor-pointer p-2 rounded`}
                        >
                          {item.icon}
                          <span className="">{item.label}</span>
                        </p>
                      </Link>
                    ))}
                  </ul>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
