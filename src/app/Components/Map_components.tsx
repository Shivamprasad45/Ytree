"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";
import React from "react";
import { useSession } from "next-auth/react";
import MaxWidthRappers from "@/components/MaxWidthRapper";

import {
  useGetALL_coordsQuery,
  useGetAll_usersQuery,
} from "../Featuers/Global/GlobeServices";

// Extend L.Icon.Default to customize the icon without TypeScript errors
const IconOne = new L.Icon({
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  iconRetinaUrl:
    "https://img.icons8.com/?size=100&id=6ozQ6RVpK3sa&format=png&color=000000",
  iconUrl:
    "https://img.icons8.com/?size=100&id=6ozQ6RVpK3sa&format=png&color=000000",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const IconTwo = new L.Icon({
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  iconRetinaUrl:
    "https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg",
  iconUrl: "https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapComponent = () => {
  const { data: All_coords, isLoading: coordsLoading } = useGetALL_coordsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: All_users, isLoading: usersLoading } = useGetAll_usersQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: session } = useSession();

  if (coordsLoading || usersLoading) return <div>Loading...</div>; // Loading state

  return (
    <MaxWidthRappers className="mx-auto">
      <div className="p-3 text-2xl font-semibold">Tree Locations</div>
      {All_coords && All_coords.length > 0 && (
        <MapContainer
          center={[All_coords[0].late, All_coords[0].long]}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {All_coords.map((coord, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <Marker
                position={[coord.late, coord.long]}
                icon={coord.UserId === session?.user?.id ? IconTwo : IconOne}
              >
                <Popup>
                  <p>{coord.Plant_Addresses}</p>
                  <p>{coord.commonName}</p>
                  {All_users &&
                    All_users.find((user) => user._id === coord.UserId)
                      ?.firstName}
                </Popup>
              </Marker>
            </motion.div>
          ))}
        </MapContainer>
      )}
    </MaxWidthRappers>
  );
};

export default MapComponent;
