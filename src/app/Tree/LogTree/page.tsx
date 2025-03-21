"use client";

import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import {
  Allow_Notification_Endpoints_Selector,
  Coords_Selector,
} from "@/app/Featuers/TreeOrder/TreeOrderSlice";
import { Enter_Plant_coords } from "../../../../type";
import { useSave_plants_coordsMutation } from "@/app/Featuers/TreeOrder/TreeOrderServices";
import PushNotifications from "@/app/lib/PushNoti";
import { toast } from "sonner";
import { useGetlog_treeMutation } from "@/app/Featuers/Tree/TreeServices";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <Skeleton className="h-64 w-full" />,
});

const Logtrees = () => {
  const [Iplant, { data: About_Mytree, isLoading }] = useGetlog_treeMutation();
  const Searchparams = useSearchParams();
  const Notification = useSelector(Allow_Notification_Endpoints_Selector);
  const Plants_CurrentLocations = useSelector(Coords_Selector);
  const route = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const [
    Save_coords,
    { isLoading: isLoading_coords, isSuccess: is_coord_success },
  ] = useSave_plants_coordsMutation();

  useEffect(() => {
    const fetchData = async () => {
      const _id = Searchparams.get("id");
      const Plaint_id = Searchparams.get("Plaintid");
      const User_id = Searchparams.get("userid");

      if (_id && Plaint_id && User_id) {
        await Fetch_user({ _ID: _id, Plaint_id: Plaint_id, User_id: User_id });
      }
    };

    fetchData();
  }, [Searchparams]);

  async function Fetch_user({
    _ID,
    Plaint_id,
    User_id,
  }: {
    _ID: string;
    User_id: string;
    Plaint_id: string;
  }) {
    const user = { _ID, Plaint_id, User_id };

    try {
      await Iplant(user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      toast.error("Failed to load tree data");
    }
  }

  const Save_plant_coords: Enter_Plant_coords = {
    find_id: About_Mytree?.findtree_id || "",
    commonName: About_Mytree?.name || "",
    Plant_id: About_Mytree?.Plaintid || "",
    imageURL: About_Mytree?.imageUrl || "",
    UserId: About_Mytree?.UserId || "",
    Plant_Addresses: Plants_CurrentLocations?.Address || "",
    long: Plants_CurrentLocations?.long!,
    late: Plants_CurrentLocations?.late!,
    subscription: {
      expirationTime: Notification?.expirationTime!,
      endpoint: Notification?.endpoint!,
      keys: {
        p256dh: Notification?.keys.p256dh!,
        auth: Notification?.keys.auth!,
      },
    },
  };

  const Tree_coords_Save = async () => {
    try {
      if (
        !Plants_CurrentLocations?.late ||
        !Plants_CurrentLocations?.long ||
        !Plants_CurrentLocations?.Address
      ) {
        toast.error("Please allow access to your current location");
        return;
      }
      if (!Notification?.endpoint) {
        toast.error("Please enable push notifications");
        return;
      }
      await Save_coords(Save_plant_coords);
      setIsSaved(true);
      toast.success("Tree coordinates saved successfully");
    } catch (error) {
      console.error("Failed to save coordinates:", error);
      toast.error("Failed to save tree coordinates");
    }
  };

  useEffect(() => {
    if (is_coord_success) {
      route.push("/Tree/Mytrees");
    }
  }, [is_coord_success, route]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PushNotifications />
      <div className="max-w-md mx-auto p-4 space-y-4">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>{About_Mytree?.name || "Tree Details"}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative h-48 bg-green-100">
              <img
                src={
                  "https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                }
                alt={About_Mytree?.name || "Tree"}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 p-4">
                <p className="text-sm text-gray-600">
                  {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="h-64">
              <Map />
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-600">
              {Plants_CurrentLocations?.Address || "Location not set"}
            </p>
          </CardFooter>
        </Card>

        <Button
          onClick={Tree_coords_Save}
          className="w-full"
          disabled={isLoading || isLoading_coords || isSaved}
        >
          {isLoading_coords ? "Saving..." : isSaved ? "Saved" : "Save Location"}
        </Button>
      </div>
    </Suspense>
  );
};

export default Logtrees;
