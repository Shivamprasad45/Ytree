"use client";

import {
  ContactRoundIcon,
  Globe,
  Home,
  ListTree,
  MessageCircleCodeIcon,
  TreePalm,
  TreesIcon,
  UserX2Icon,
  Share2,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, UserSelector } from "../Featuers/Auth/AuthSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const menuItems = [
  {
    id: 8,
    icon: <Home size={20} />,
    label: "Home",
    path: "/",
  },
  { id: 1, icon: <TreePalm size={20} />, label: "Trees", path: "/Tree/Shop" },
  { id: 6, icon: <TreesIcon size={20} />, label: "Cart", path: "/Tree/Cart" },

  {
    id: 2,
    icon: <MessageCircleCodeIcon size={20} />,
    label: "Message",
    path: "/Tree/Message",
  },
  {
    id: 3,
    icon: <ContactRoundIcon size={20} />,
    label: "Contact us",
    path: "/Contact",
  },
  {
    id: 5,
    icon: <ListTree size={20} />,
    label: "Mytree",
    path: "/Tree/Mytrees",
  },
  {
    id: 7,
    icon: <Globe size={20} />,
    label: "Tree Locations",
    path: "/Tree/Global",
  },
  {
    id: 8,
    icon: <Share2 size={20} />,
    label: "invite me",
    path: "/invite",
  },
];

export default function Lefttab() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  const user = useSelector(UserSelector);
  const route = usePathname();

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

  if (["/Signup", "/login", "/Resend"].includes(route)) {
    return null;
  }

  return (
    <div className="flex flex-col h-[55vh] border-r bg-background">
      <div className="pt-6 pr-3 pl-3 pb-3">
        {user?.Username ? (
          <div className="flex items-center space-x-4">
            <Avatar className="w-10 h-10">
              {session?.user.image ? (
                <AvatarImage src={session?.user.image} alt="Profile picture" />
              ) : (
                <AvatarFallback>
                  {user.Username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-sm font-semibold">
                {user.Username.slice(0, 8) + "..."}
              </h2>
              <p className="text-xs text-muted-foreground">
                {user.email.slice(0, 10)}
              </p>
            </div>
          </div>
        ) : (
          <Link href="/login">
            <Button variant="outline" className="w-full">
              <UserX2Icon className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </Link>
        )}
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.path}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  item.id === 6 ? "hidden" : ""
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
