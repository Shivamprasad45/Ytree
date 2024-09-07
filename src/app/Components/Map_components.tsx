"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";
import React from "react";
import { useSession } from "next-auth/react";
import { All_Users, Coordinate } from "../../../type";

// Custom Icons
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

interface MapComponentProps {
  All_coords: Coordinate[];
  All_users: All_Users[];
}

const MapComponent: React.FC<MapComponentProps> = ({
  All_coords,
  All_users,
}) => {
  const { data: session } = useSession();

  if (All_coords.length === 0) return <div>Loading...</div>; // Loading state
  console.log(All_coords.length, All_users, "users");
  return (
    <MapContainer
      center={
        All_coords.length > 0
          ? ([All_coords[0].late, All_coords[0].long] as [number, number])
          : [0, 0]
      }
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
              {All_users.find((all) => all._id === coord.UserId)?.firstName}
            </Popup>
          </Marker>
        </motion.div>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
