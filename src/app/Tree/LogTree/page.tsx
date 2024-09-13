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
import { Card, CardContent } from "@/components/ui/card";

const Map = dynamic(() => import("./Map"), { ssr: false });

const Logtrees = () => {
  const [Iplant, { data: About_Mytree, isLoading }] = useGetlog_treeMutation();

  const Searchparams = useSearchParams();

  //Fetch the plant information from the   database
  useEffect(() => {
    const fetchData = async () => {
      const _id = Searchparams.get("id");
      const Plaint_id = Searchparams.get("Plaintid");
      const User_id = Searchparams.get("userid");

      if (_id && Plaint_id && User_id) {
        // Wait for state to be updated before calling Fetch_user
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
    console.log(user, "User");

    try {
      await Iplant(user);
    } catch (error) {
      console.log(error);
    }
  }

  // const trees = useSelector(MyTreesSelector);
  const Notification = useSelector(Allow_Notification_Endpoints_Selector);

  const Plants_CurrentLocations = useSelector(Coords_Selector);

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

  const [
    Save_coords,
    { isLoading: isLoading_coords, isSuccess: is_coord_success },
  ] = useSave_plants_coordsMutation();

  const Tree_coords_Save = () => {
    try {
      if (Notification?.endpoint) {
        if (
          !Plants_CurrentLocations?.late &&
          !Plants_CurrentLocations?.long &&
          !Plants_CurrentLocations?.Address
        ) {
          toast.error("Use Allow your current location");
        }

        Save_coords(Save_plant_coords);
      } else {
        toast.error("Please allow notifications");
      }
    } catch (error) {
      toast("Please allow notifications");
      console.log("Fail to save coords", error);
    }
  };

  const route = useRouter();

  useEffect(() => {
    if (is_coord_success) {
      route.push("/Tree/Mytrees");
    }
  }, [is_coord_success, route]);

  return (
    <Suspense>
      <PushNotifications />
      <div className="max-w-md mx-auto p-4 bg-gray-50 ">
        <Card className="mb-4 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-48 bg-green-100">
              <img
                src="https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                alt="Teak Tree"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 p-4">
                <h1 className="text-2xl font-bold text-green-800">Teak Tree</h1>
                <p className="text-sm text-gray-600">
                  {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-0">
            <div className="pb-7 h-64 ">
              {/* This would be replaced with an actual map component */}
              <Map />
              {/* <div className="absolute  left-4 right-8 bg-white rounded-lg shadow max-w-sm justify-center">
                <p className="text-sm font-medium text-gray-700 text-center">
                  Lat: {Plants_CurrentLocations?.late}, Lon:{" "}
                  {Plants_CurrentLocations?.late}
                </p>
                <p className="text-xs text-gray-500">
                  {Plants_CurrentLocations?.Address}
                </p>
              </div> */}
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button onClick={Tree_coords_Save} className="flex-1  text-white">
            <h1 className="truncate">
              {isLoading_coords ? "....Saving" : "Save"}
            </h1>
          </Button>
        </div>
      </div>
    </Suspense>
  );
};

export default Logtrees;
