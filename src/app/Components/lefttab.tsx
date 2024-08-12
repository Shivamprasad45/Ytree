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
import React from "react";
import { menuItem } from "../../../type";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { UserSelector } from "../Featuers/Auth/AuthSlice";

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
  { id: 4, icon: <LogOut size={20} />, label: "Logout", path: "/logout" },
  {
    id: 5,
    icon: <ListTree size={20} />,
    label: "Mytree",
    path: "/Tree/Mytrees",
  },
];
const Lefttab = () => {
  const route = usePathname();
  const user = useSelector(UserSelector);
  if (route === "/Auth/Signup") {
    return (
      <>
        <div className=""></div>
      </>
    );
  }
  if (route === "/Auth/Login") {
    return (
      <>
        <div className=""></div>
      </>
    );
  }
  if (route === "/Auth/Resend") {
    return (
      <>
        <div className=""></div>
      </>
    );
  }
  return (
    <div className="flex flex-col px-2 border-r h-full  ">
      {user?.Username ? (
        <div className="flex items-center font-semibold gap-12 justify-start min-w-40 mb-6 pl-2">
          <Image
            width={100}
            height={100}
            src="https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
            className="rounded-full w-12 h-12 hover:border-2 border-2 border-black"
            alt="profile picture"
          />
          <span className="text-lg">
            {user && user.Username !== ""
              ? user.Username.slice(0, 8)
              : "not found"}
          </span>
        </div>
      ) : (
        <Link
          className="flex items-center  gap-12 justify-start min-w-40 mb-6 pl-4 underline text-blue-500"
          href="/Auth/Login"
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
