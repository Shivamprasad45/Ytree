"use client";
import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import {
  Allow_Notification_Endpoints_Selector,
  Coords_Selector,
  MyTreesSelector,
} from "@/app/Featuers/TreeOrder/TreeOrderSlice";
import { soilTypes } from "@/app/lib/Exports";
import { Enter_Plant_coords } from "../../../../type";
import { useSave_plants_coordsMutation } from "@/app/Featuers/TreeOrder/TreeOrderServices";
import PushNotifications from "@/app/lib/PushNoti";

const Map = dynamic(() => import("./Map"), { ssr: false });

const Logtrees = () => {
  const [selectedSoil, setselectedSoil] = useState<string>("");
  const [_ID, set_ID] = useState<string>("");
  const [Plaint_id, setPlaint_id] = useState<string>("");
  const [User_id, setUser_id] = useState<string>("");
  const Searchparams = useSearchParams();

  useEffect(() => {
    const _id = Searchparams.get("id");
    const Plaint_id = Searchparams.get("Plaintid");
    const User_id = Searchparams.get("userid");

    if (_id && Plaint_id && User_id) {
      set_ID(_id);
      setPlaint_id(Plaint_id);
      setUser_id(User_id);
    }
  }, [Searchparams]);

  const trees = useSelector(MyTreesSelector);
  const Notification = useSelector(Allow_Notification_Endpoints_Selector);
  console.log(Notification, "Notification");

  const About_Mytree = trees?.find(
    (item) =>
      item._id === _ID && item.Plaintid === Plaint_id && item.UserId === User_id
  );

  const onSoilChange = (soilType: string) => {
    setselectedSoil(soilType);
  };

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
      Save_coords(Save_plant_coords);
    } catch (error) {
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
      <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-[512px] py-5 max-w-[960px] flex-1">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <p className="text-[#111811] tracking-light text-[32px] font-bold leading-tight min-w-72">
                  Log Plant Location
                </p>
              </div>
              <h3 className="text-[#111811] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Plant Information
              </h3>
              <div className="flex items-center gap-4 bg-[#f9fbf9] px-4 min-h-[72px] py-2">
                <img
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                  src={About_Mytree?.imageUrl || ""}
                  alt="Plant"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-[#111811] text-base font-medium leading-normal line-clamp-1">
                    {About_Mytree?.name}
                  </p>
                  <p className="text-[#608562] text-sm font-normal leading-normal line-clamp-2">
                    {About_Mytree?.age?.toString()}
                  </p>
                </div>
              </div>
              <h3 className="text-[#111811] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Location
              </h3>
              <div className="">
                <Map />
              </div>
              <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
                <div>
                  <label htmlFor="soilType">Select Soil Type:</label>
                  <select
                    id="soilType"
                    value={selectedSoil}
                    onChange={(e) => onSoilChange(e.target.value)}
                  >
                    <option value="" disabled>
                      Select soil type
                    </option>
                    {soilTypes.map((soilType) => (
                      <option key={soilType} value={soilType}>
                        {soilType}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3"></div>
              <div className="flex px-4 py-3">
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#4cae4f] text-[#111811] text-sm font-bold leading-normal tracking-[0.015em]"
                  onClick={Tree_coords_Save}
                >
                  <span className="truncate">
                    {isLoading_coords ? "....Saving" : "Save"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Logtrees;
