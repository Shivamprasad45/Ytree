"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { signOut, useSession } from "next-auth/react";
import { useGetCartItemByIdQuery } from "../Featuers/Treecart/TreeServicesAPI";
import { UserSelector } from "../Featuers/Auth/AuthSlice";
import { menuItems } from "./lefttab";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./Togglemode";
import ConnectionStatus from "../lib/Connection";

import {
  Menu,
  ShoppingCart,
  User,
  LogOut,
  ChevronDown,
  Home,
  Info,
  ShoppingBag,
  BookOpen,
  CircleHelp,
} from "lucide-react";

const Navbar = () => {
  const user = useSelector(UserSelector);
  const { data: session } = useSession();
  const { data: cartdata } = useGetCartItemByIdQuery(user?._id!);
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setShouldRender(!["/Signup", "/login", "/Resend"].includes(pathname));
  }, [pathname]);

  // Close sheet when pathname changes (navigation occurs)
  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  // Skip rendering on auth pages
  if (!shouldRender) {
    return <></>;
  }

  // Calculate total cart items
  const totalCartItems = cartdata?.reduce((a, b) => a + b.quantity, 0) || 0;

  // Handle scroll effect
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 10);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/95 shadow-sm backdrop-blur-md py-2"
        : "bg-background/80 backdrop-blur-sm py-3"
        }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              height={300}
              width={400}
              alt="VanaGrow Logo"
              src="/logo.png"
              className="w-10 h-9 md:w-12 md:h-10"
              priority
            />
            <div className="font-semibold text-lg md:text-xl">
              <span className="text-primary">Vana</span>
              <span>Grow</span>
            </div>
          </Link>

          {/* Connection Status - Always visible */}
          <ConnectionStatus />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`transition-colors hover:text-primary ${pathname === "/" ? "text-primary font-medium" : ""
                }`}
            >
              Home
            </Link>
            <Link
              href="/About"
              className={`transition-colors hover:text-primary ${pathname === "/About" ? "text-primary font-medium" : ""
                }`}
            >
              About
            </Link>
            <Link
              href="/affiliate-shop"
              className={`transition-colors hover:text-primary ${pathname === "/affiliate-shop" ? "text-primary font-medium" : ""
                }`}
            >
              Shop
            </Link>
            <Link
              href="/blog"
              className={`transition-colors hover:text-primary ${pathname === "/blog" ? "text-primary font-medium" : ""
                }`}
            >
              Blog
            </Link>
            <Link
              href="/how-it-works"
              className={`transition-colors hover:text-primary ${pathname === "/how-it-works" ? "text-primary font-medium" : ""
                }`}
            >
              How it Works
            </Link>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 px-2 h-9"
                >
                  Services <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                {menuItems
                  .filter((item) => item.id !== 6)
                  .map((item) => (
                    <DropdownMenuItem key={item.id} asChild>
                      <Link
                        href={item.path}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        {React.cloneElement(item.icon, {
                          className: "h-4 w-4",
                        })}
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              href="/Tree/Cart"
              className="relative p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartItems > 0 && (
                <Badge
                  variant={"default"}
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {totalCartItems}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Link>

            {/* Theme Toggle */}
            <ModeToggle />

            {/* User Menu */}
            {user?.email ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      {session?.user.image ? (
                        <AvatarImage src={session.user.image} alt="Profile" />
                      ) : (
                        <AvatarFallback>
                          {user.Username?.slice(0, 2).toUpperCase() || "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/Tree/Mytrees" className="cursor-pointer">
                      My Trees
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm">
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Cart */}
          <Link href="/Tree/Cart" className="relative p-2">
            <ShoppingCart className="w-5 h-5" />
            {totalCartItems > 0 && (
              <Badge
                variant="default"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {totalCartItems}
              </Badge>
            )}
          </Link>

          {/* User Avatar or Sign In */}
          {user?.email ? (
            <Avatar className="h-8 w-8">
              {session?.user.image ? (
                <AvatarImage src={session.user.image} alt="Profile" />
              ) : (
                <AvatarFallback>
                  {user.Username?.slice(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              )}
            </Avatar>
          ) : (
            <Link href="/login">
              <User className="w-5 h-5" />
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center gap-2">
                    <Image
                      height={40}
                      width={40}
                      alt="VanaGrow Logo"
                      src="/logo.png"
                      className="w-8 h-7"
                    />
                    <span className="font-semibold">
                      <span className="text-primary">Vana</span>
                      <span>Grow</span>
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4">
                {/* User Info */}
                {user?.email && (
                  <div className="flex items-center gap-3 mb-2 p-3 bg-muted/50 rounded-lg">
                    <Avatar className="h-10 w-10">
                      {session?.user.image ? (
                        <AvatarImage src={session.user.image} alt="Profile" />
                      ) : (
                        <AvatarFallback>
                          {user.Username?.slice(0, 2).toUpperCase() || "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.Username || "User"}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <div className="space-y-1">
                  <Link
                    href="/"
                    className={`flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors ${pathname === "/" ? "bg-muted font-medium" : ""
                      }`}
                    onClick={() => setSheetOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Link>

                  <Link
                    href="/About"
                    className={`flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors ${pathname === "/About" ? "bg-muted font-medium" : ""
                      }`}
                    onClick={() => setSheetOpen(false)}
                  >
                    <Info className="h-5 w-5" />
                    <span>About</span>
                  </Link>

                  <Link
                    href="/affiliate-shop"
                    className={`flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors ${pathname === "/affiliate-shop"
                      ? "bg-muted font-medium"
                      : ""
                      }`}
                    onClick={() => setSheetOpen(false)}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Shop</span>
                  </Link>

                  <Link
                    href="/blog"
                    className={`flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors ${pathname === "/blog" ? "bg-muted font-medium" : ""
                      }`}
                    onClick={() => setSheetOpen(false)}
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>Blog</span>
                  </Link>

                  <Link
                    href="/how-it-works"
                    className={`flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors ${pathname === "/how-it-works"
                      ? "bg-muted font-medium"
                      : ""
                      }`}
                    onClick={() => setSheetOpen(false)}
                  >
                    <CircleHelp className="h-5 w-5" />
                    <span>How it Works</span>
                  </Link>
                </div>

                {/* Services Section */}
                <div className="pt-2">
                  <h3 className="mb-1 px-2 text-sm font-medium text-muted-foreground">
                    Services
                  </h3>
                  <div className="space-y-1">
                    {menuItems
                      .filter((item) => item.id !== 6)
                      .map((item) => (
                        <Link
                          key={item.id}
                          href={item.path}
                          className={`flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors ${pathname === item.path ? "bg-muted font-medium" : ""
                            }`}
                          onClick={() => setSheetOpen(false)}
                        >
                          {React.cloneElement(item.icon, {
                            className: "h-5 w-5",
                          })}
                          <span>{item.label}</span>
                        </Link>
                      ))}
                  </div>
                </div>

                {/* Theme Toggle */}
                <div className="pt-2 px-2">
                  <ModeToggle />
                </div>

                {/* Auth Button */}
                <div className="pt-4">
                  {user?.email ? (
                    <Button
                      onClick={() => {
                        setSheetOpen(false);
                        signOut();
                      }}
                      variant="destructive"
                      className="w-full"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className="w-full"
                      onClick={() => setSheetOpen(false)}
                    >
                      <Link href="/login">Sign In</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
