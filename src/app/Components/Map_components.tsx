"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";
import React from "react";

// Extend L.Icon.Default to customize the icon without TypeScript errors
const CustomIcon = L.Icon.Default.extend({
  options: {
    iconRetinaUrl:
      "https://img.icons8.com/?size=100&id=6ozQ6RVpK3sa&format=png&color=000000",
    iconUrl:
      "https://img.icons8.com/?size=100&id=6ozQ6RVpK3sa&format=png&color=000000",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  },
});

L.Marker.prototype.options.icon = new CustomIcon();

type Coordinate = {
  lat: number;
  lng: number; // Change this to number
  placeName: string;
};

interface MapProps {
  coordinates: Coordinate[];
}

const MapComponent: React.FC<MapProps> = ({ coordinates }) => {
  return (
    <MapContainer
      center={[coordinates[0].lat, coordinates[0].lng]} // No need to parseFloat
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
          <Marker position={[coord.lat, coord.lng]}>
            <Popup>{coord.placeName}</Popup>
          </Marker>
        </motion.div>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
