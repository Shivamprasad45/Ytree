"use client";
import React, { FC } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

interface SatelliteMapProps {
  lat: number;
  lng: number;
}

const SatelliteMap: FC<SatelliteMapProps> = ({ lat, lng }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyAMpAU4v81Zr9Kyml1Gts_iafgxXPZtoVw">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: lat, lng: lng }}
        zoom={20} // Adjust zoom for clarity
        mapTypeId="satellite" // This enables satellite view
      >
        {/* You can add markers or other features here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default SatelliteMap;
