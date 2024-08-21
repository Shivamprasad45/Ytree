"use client";
import {
  BotMessageSquare,
  ContactRoundIcon,
  ListTree,
  LogOut,
  MessageCircleCodeIcon,
  TreePalm,
  TreesIcon,
  UserX2Icon,
} from "lucide-react";

import Image from "next/image";
import React, { useEffect } from "react";
import { menuItem } from "../../../type";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, UserSelector } from "../Featuers/Auth/AuthSlice";
import { useSession } from "next-auth/react";

export const menuItems: menuItem[] = [
  { id: 1, icon: <TreePalm size={20} />, label: "Trees", path: "/Tree/Shop" },
  {
    id: 6,
    icon: <TreesIcon size={20} />,
    label: "Cart",
    path: "/Tree/Cart",
  },
  {
    id: 2,
    icon: <MessageCircleCodeIcon size={20} />,
    label: "Message",
    path: "/Tree/Shop",
  },
  {
    id: 3,
    icon: <ContactRoundIcon size={20} />,
    label: "Contact us",
    path: "/Tree/Shop",
  },

  {
    id: 5,
    icon: <ListTree size={20} />,
    label: "Mytree",
    path: "/Tree/Mytrees",
  },
];

const Lefttab = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const user = useSelector(UserSelector);
  const route = usePathname();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
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
    return null; // No sidebar on these routes
  }

  return (
    <div className="flex flex-col px-2 border-r h-full">
      {user?.Username ? (
        <div className="flex items-center font-semibold gap-12 justify-start min-w-40 mb-6 pl-2">
          <Image
            width={100}
            height={100}
            src={session?.user.image || "/default-avatar.png"}
            className="rounded-full w-12 h-12 hover:border-2 border-2 border-black"
            alt="profile picture"
          />
          <span className="text-lg">
            {user.Username ? user.Username.slice(0, 8) : "not found"}
          </span>
        </div>
      ) : (
        <Link
          className="flex items-center  gap-12 justify-start min-w-40 mb-6 pl-4 underline text-blue-500"
          href="/login"
        >
          <UserX2Icon />
        </Link>
      )}
      <div className="flex flex-col gap-3 items-start mt-10 bg-scroll">
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
      </div>
    </div>
  );
};

export default Lefttab;
