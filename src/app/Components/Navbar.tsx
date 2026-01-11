"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signOut, useSession } from "next-auth/react";
import { useGetCartItemByIdQuery } from "../Featuers/Treecart/TreeServicesAPI";
import { setUserInfo, UserSelector } from "../Featuers/Auth/AuthSlice";
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
  ShoppingBasket,
  LogOut,
  ChevronDown,
  Home,
  Users,
  Store,
  Newspaper,
  Lightbulb,
  Grid,
  Leaf,
  UserCircle
} from "lucide-react";

const Navbar = () => {
  const user = useSelector(UserSelector);
  const { data: session, status } = useSession();
  const { data: cartdata } = useGetCartItemByIdQuery(user?._id!);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShouldRender(!["/Signup", "/login", "/Resend"].includes(pathname));
  }, [pathname]);

  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (session?.user) {
      dispatch(
        setUserInfo({
          _id: session.user.id!,
          email: session.user.email!,
          Username: session.user.name!,
        })
      );
    }
  }, [session, status, dispatch]);

  if (!shouldRender) {
    return <></>;
  }

  const totalCartItems = cartdata?.reduce((a, b) => a + b.quantity, 0) || 0;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/95 shadow-sm backdrop-blur-md py-2"
        : "bg-background/80 backdrop-blur-sm py-4"
        }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">

        {/* Left Section: Logo & Status */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110">
              <Image
                fill
                alt="VanaGrow Logo"
                src="/logo.png"
                className="object-contain"
                priority
              />
            </div>
            <div className="font-bold text-lg md:text-xl tracking-tight">
              <span className="text-primary">Vana</span>
              <span className="text-foreground">Grow</span>
            </div>
          </Link>
          <div className="hidden md:block">
            <ConnectionStatus />
          </div>
        </div>

        {/* Center Section: Navigation */}
        <div className="hidden lg:flex items-center bg-muted/40 rounded-full px-6 py-2 border border-border/50 backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <NavLink href="/" icon={<Home className="w-4 h-4" />} label="Home" active={pathname === "/"} />
            <NavLink href="/About" icon={<Users className="w-4 h-4" />} label="About" active={pathname === "/About"} />
            <NavLink href="/affiliate-shop" icon={<Store className="w-4 h-4" />} label="Shop" active={pathname === "/affiliate-shop"} />
            <NavLink href="/blog" icon={<Newspaper className="w-4 h-4" />} label="Blog" active={pathname === "/blog"} />

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 px-3 py-1.5 rounded-full text-muted-foreground hover:text-primary hover:bg-muted font-medium transition-all"
                >
                  <Grid className="w-4 h-4" />
                  Services <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 p-2 rounded-xl border-border/60 shadow-lg bg-background/95 backdrop-blur-md">
                {menuItems
                  .filter((item) => item.id !== 6)
                  .map((item) => (
                    <DropdownMenuItem key={item.id} asChild className="rounded-lg focus:bg-primary/10 focus:text-primary cursor-pointer">
                      <Link
                        href={item.path}
                        className="flex items-center gap-3 py-2"
                      >
                        <div className="p-1.5 rounded-md bg-muted text-foreground">
                          {React.cloneElement(item.icon, { className: "h-4 w-4" })}
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink href="/how-it-works" icon={<Lightbulb className="w-4 h-4" />} label="How it Works" active={pathname === "/how-it-works"} />
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-3">

          <ModeToggle />

          <Link href="/Tree/Cart">
            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
              <ShoppingBasket className="w-5 h-5" />
              {totalCartItems > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground border-2 border-background animate-in zoom-in"
                >
                  {totalCartItems}
                </Badge>
              )}
            </Button>
          </Link>

          {user?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all">
                  <Avatar className="h-9 w-9">
                    {session?.user.image ? (
                      <AvatarImage src={session.user.image} alt="Profile" />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {user.Username?.slice(0, 2).toUpperCase() || "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl border-border/60 shadow-lg">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg mb-2">
                  <Avatar className="h-10 w-10 border border-border">
                    {session?.user.image ? (
                      <AvatarImage src={session.user.image} alt="Profile" />
                    ) : (
                      <AvatarFallback>
                        {user.Username?.slice(0, 2).toUpperCase() || "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="overflow-hidden">
                    <p className="font-semibold truncate">{user.Username || "User"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                  <Link href="/profile" className="flex items-center gap-2">
                    <UserCircle className="w-4 h-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                  <Link href="/Tree/Mytrees" className="flex items-center gap-2">
                    <Leaf className="w-4 h-4" /> My Trees
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10 rounded-lg cursor-pointer font-medium"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="rounded-full px-6 font-semibold shadow-md hover:shadow-lg transition-all" size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 border-l border-border/60">
                <SheetHeader className="p-6 border-b border-border/40">
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <Image
                        height={32}
                        width={32}
                        alt="VanaGrow Logo"
                        src="/logo.png"
                        className="w-8 h-8"
                      />
                      <span className="font-bold text-xl">
                        <span className="text-primary">Vana</span>
                        <span>Grow</span>
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full py-6 px-4">
                  {/* User Status (Mobile) */}
                  {user?.email && (
                    <div className="mb-6 p-4 bg-muted/40 rounded-xl border border-border/50">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-border">
                          {session?.user.image ? (
                            <AvatarImage src={session.user.image} alt="Profile" />
                          ) : (
                            <AvatarFallback>
                              {user.Username?.slice(0, 2).toUpperCase() || "U"}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="font-semibold">{user.Username || "User"}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile Links */}
                  <div className="flex-1 space-y-1 overflow-y-auto pr-2">
                    <MobileNavLink href="/" icon={<Home />} label="Home" onClick={() => setSheetOpen(false)} active={pathname === '/'} />
                    <MobileNavLink href="/About" icon={<Users />} label="About" onClick={() => setSheetOpen(false)} active={pathname === '/About'} />
                    <MobileNavLink href="/affiliate-shop" icon={<Store />} label="Shop" onClick={() => setSheetOpen(false)} active={pathname === '/affiliate-shop'} />
                    <MobileNavLink href="/blog" icon={<Newspaper />} label="Blog" onClick={() => setSheetOpen(false)} active={pathname === '/blog'} />
                    <MobileNavLink href="/how-it-works" icon={<Lightbulb />} label="How it Works" onClick={() => setSheetOpen(false)} active={pathname === '/how-it-works'} />

                    <div className="my-4 border-t border-border/40" />
                    <p className="text-xs font-semibold text-muted-foreground px-4 mb-2 uppercase tracking-wider">Services</p>
                    {menuItems
                      .filter((item) => item.id !== 6)
                      .map((item) => (
                        <Link
                          key={item.id}
                          href={item.path}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors text-foreground/80 hover:text-primary"
                          onClick={() => setSheetOpen(false)}
                        >
                          {React.cloneElement(item.icon, {
                            className: "h-5 w-5",
                          })}
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-border/40">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="font-medium text-sm text-muted-foreground">App Theme</div>
                      <ModeToggle />
                    </div>
                    {user?.email ? (
                      <Button
                        onClick={() => {
                          setSheetOpen(false);
                          signOut();
                        }}
                        variant="destructive"
                        className="w-full rounded-xl font-semibold shadow-sm"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    ) : (
                      <Button
                        asChild
                        className="w-full rounded-xl font-semibold shadow-sm"
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
      </div>
    </nav>
  );
};

// Helper Component for Desktop Links
const NavLink = ({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) => (
  <Link
    href={href}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${active
      ? "bg-primary text-primary-foreground shadow-md"
      : "text-muted-foreground hover:text-primary hover:bg-muted"
      }`}
  >
    {icon}
    {label}
  </Link>
);

// Helper Component for Mobile Links
const MobileNavLink = ({ href, icon, label, onClick, active }: any) => (
  <Link
    href={href}
    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${active
      ? "bg-primary/10 text-primary font-semibold"
      : "text-foreground/80 hover:bg-muted hover:text-foreground"
      }`}
    onClick={onClick}
  >
    {React.cloneElement(icon, { className: "w-5 h-5" })}
    <span>{label}</span>
  </Link>
)

export default Navbar;
