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
  EarthLockIcon,
  LucideMenu,
  TreesIcon,
  TrendingUpIcon,
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
import { signOut, useSession } from "next-auth/react";
import { useGetCartItemByIdQuery } from "../Featuers/Treecart/TreeServicesAPI";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const user = useSelector(UserSelector);
  const { data: session, status } = useSession();
  const { data: cartdata, isLoading: isCartLoading } = useGetCartItemByIdQuery(
    user?._id!
  );

  const route = usePathname();

  if (["/Signup", "/login", "/Resend"].includes(route)) {
    return null; // No sidebar on these routes
  }
  const Total_cart_item =
    cartdata && cartdata?.reduce((a, b) => a + b.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 border-b mb-2 bg-background/80 backdrop-blur-sm transition-all">
      <div className="container mx-auto px-4 py-1 flex items-center justify-between transition-all">
        <ConnectionStatus />
        <Link href={"/"} className="flex items-center space-x-2 justify-center">
          <Image
            height={300}
            width={400}
            alt="Yplant Logo"
            src="/logo.png"
            className="w-14 h-12"
          />
          <div className="text-container text-sm md:text-lg font-semibold">
            <span className="letter text-primary">Vana</span>
            <span className="letter">Grow</span>
          </div>
        </Link>
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/About"
              className="hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/Tree/Cart"
              className="flex items-center space-x-2 hover:text-primary transition-colors"
            >
              <span className="relative">
                <Badge variant="secondary" className="absolute -top-4 -right-2">
                  {Total_cart_item}
                </Badge>
                <TreesIcon className="w-5 h-5" />
              </span>
              <span>Cart</span>
            </Link>
            <Link
              href="/Tree/UploadTree"
              className="flex items-center space-x-2 hover:text-primary transition-colors"
            >
              <span className="relative">
                <Badge
                  variant="secondary"
                  className="absolute -top-4 -right-2 text-[6px] text-red-500"
                >
                  {"New"}
                </Badge>
                <TrendingUpIcon className="w-5 h-5" />
              </span>
            </Link>
            {user?.email ? (
              <Button onClick={() => signOut()}>Logout</Button>
            ) : (
              <Button asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
          <ModeToggle />
          <div className="flex items-center space-x-4 md:hidden">
            <Link href="/Tree/Mytrees">
              <EarthLockIcon className="w-5 h-5 hover:text-primary transition-colors" />
            </Link>
            <Link
              href="/Tree/Cart"
              className="flex items-center space-x-2 hover:text-primary transition-colors"
            >
              <span className="relative">
                <Badge variant="secondary" className="absolute -top-4 -right-2">
                  {Total_cart_item}
                </Badge>
                <TreesIcon className="w-5 h-5" />
              </span>
            </Link>
            <Link
              href="/Tree/UploadTree"
              className="flex items-center space-x-2 hover:text-primary transition-colors"
            >
              <span className="relative">
                <Badge
                  variant="secondary"
                  className="absolute -top-4 -right-2 text-[6px] text-red-500"
                >
                  {"New"}
                </Badge>
                <TrendingUpIcon className="w-5 h-5" />
              </span>
            </Link>
            {!user?.email ? (
              <Link href="/login">
                <UserX2Icon className="w-5 h-5 hover:text-primary transition-colors" />
              </Link>
            ) : (
              <Avatar className="w-7 h-7">
                {session?.user.image ? (
                  <AvatarImage
                    className="  "
                    src={session?.user.image}
                    alt="Profile picture"
                  />
                ) : (
                  <AvatarFallback>
                    {user.Username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <LucideMenu className="w-5 h-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-4 flex-row space-x-4">
                  <Link
                    href="/About"
                    className="hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                  {user?.email ? (
                    <Button onClick={() => signOut()}>Logout</Button>
                  ) : (
                    <Button asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                  )}
                  <ul className="space-y-2">
                    {menuItems.map(
                      (item) =>
                        item.id !== 6 && (
                          <li key={item.id}>
                            <Link
                              href={item.path}
                              className="flex items-center space-x-2 hover:text-primary transition-colors"
                            >
                              {item.icon}
                              <span>{item.label}</span>
                            </Link>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
