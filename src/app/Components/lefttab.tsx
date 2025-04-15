"use client";

import {
  ContactRoundIcon,
  Globe,
  Home,
  ListTree,
  MessageCircleCodeIcon,
  ShoppingCart,
  TreePalm,
  UserX2Icon,
  Share2,
  FireExtinguisher,
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
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMobile } from "@/Utils/use-mobile";

export const menuItems = [
  {
    id: 8,
    icon: <Home size={20} />,
    label: "Home",
    path: "/",
  },
  { id: 1, icon: <TreePalm size={20} />, label: "Trees", path: "/Tree/Shop" },
  {
    id: 6,
    icon: <ShoppingCart size={20} />,
    label: "Cart",
    path: "/Tree/Cart",
  },
  {
    id: 2,
    icon: <FireExtinguisher size={20} />,
    label: "Start joureny",
    path: "/Tree/Free_clam_tree",
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
    label: "My Trees",
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
    label: "Invite Friends",
    path: "/invite",
  },
];

function Lefttab() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const user = useSelector(UserSelector);
  const pathname = usePathname();
  const isMobile = useMobile();

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

  if (["/Signup", "/login", "/Resend"].includes(pathname)) {
    return null;
  }

  return (
    <div className="flex flex-col h-full border-r bg-background shadow-sm">
      <div className="p-4 border-b">
        {user?.Username ? (
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10 border">
              {session?.user.image ? (
                <AvatarImage
                  src={session?.user.image}
                  alt={`${user.Username}'s profile picture`}
                />
              ) : (
                <AvatarFallback className="bg-green-100 text-green-800">
                  {user.Username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="space-y-1 overflow-hidden">
              <h2
                className="text-sm font-semibold truncate"
                title={user.Username}
              >
                {user.Username.length > 15
                  ? `${user.Username.slice(0, 15)}...`
                  : user.Username}
              </h2>
              <p
                className="text-xs text-muted-foreground truncate"
                title={user.email}
              >
                {user.email}
              </p>
            </div>
          </div>
        ) : (
          <Link href="/login">
            <Button variant="outline" className="w-full gap-2 font-medium">
              <UserX2Icon className="h-4 w-4" />
              Sign In
            </Button>
          </Link>
        )}
      </div>

      <ScrollArea className="flex-1 py-2">
        <TooltipProvider delayDuration={300}>
          <div className="space-y-1 px-2">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.path || pathname.startsWith(`${item.path}/`);

              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <Link href={item.path}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start transition-all",
                          isActive && "font-medium",
                          isMobile && "px-3"
                        )}
                      >
                        <span
                          className={cn(
                            "mr-3 transition-colors",
                            isActive
                              ? "text-green-600"
                              : "text-muted-foreground"
                          )}
                        >
                          {item.icon}
                        </span>
                        {!isMobile && <span>{item.label}</span>}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  {isMobile && (
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </ScrollArea>

      <div className="p-4 border-t mt-auto">
        <div className="text-xs text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Tree Planting</p>
          <p className="mt-1">Grow a greener future</p>
        </div>
      </div>
    </div>
  );
}

export default Lefttab;
