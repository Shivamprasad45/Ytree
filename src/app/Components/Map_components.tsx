"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";
import React from "react";
import { useSession } from "next-auth/react";
import { All_Users } from "../Tree/Global/page";

// Extend L.Icon.Default to customize the icon without TypeScript errors
const IconOne = L.Icon.extend({
  options: {
    iconSize: [32, 32], // Width and height of the icon
    iconAnchor: [16, 32], // Anchor point of the icon (center bottom)
    popupAnchor: [0, -32], // Popup anchor relative to the icon
    iconRetinaUrl:
      "https://img.icons8.com/?size=100&id=6ozQ6RVpK3sa&format=png&color=000000",
    iconUrl:
      "https://img.icons8.com/?size=100&id=6ozQ6RVpK3sa&format=png&color=000000",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  },
});

const IconTwo = L.Icon.extend({
  options: {
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    iconRetinaUrl:
      "https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg",
    iconUrl:
      "https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  },
});

type Coordinate = {
  lat: number;
  lng: number;
  placeName: string;
  UserId: string;
  name: string;
};

interface MapProps {
  coordinates: Coordinate[];
  All: All_Users[]; // Include the All_Users array in the props
}

const MapComponent: React.FC<MapProps> = ({ coordinates, All }) => {
  const { data: session, status } = useSession();

  console.log(All, "selected All");
  const allUsers = All.find(
    (allUsers) => allUsers.UserId === coordinates[21].UserId
  );
  console.log(allUsers?.name, "selected24424");
  return (
    <MapContainer
      center={[coordinates[0].lat, coordinates[0].lng]} // Ensure you handle cases where coordinates array is empty
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coordinates.map((coord, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.2 }}
        >
          <Marker
            position={[coord.lat, coord.lng]}
            icon={
              coord.UserId === session?.user?.id ? new IconTwo() : new IconOne()
            }
          >
            <Popup>
              <p>{coord.placeName}</p>
              <p>{coord.name}</p>

              {All.find((all) => all.UserId === coord.UserId)?.name}
            </Popup>
          </Marker>
        </motion.div>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
