"use client";
import React, { FC, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

interface SatelliteMapProps {
  lat: number;
  lng: number;
}

const SatelliteMap: FC<SatelliteMapProps> = ({ lat, lng }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [address, setAddress] = useState<string>(""); // Store the fetched address here

  // Function to get address from lat and lng using Geocoding API
  const getAddressFromCoords = async (lat: number, lng: number) => {
    const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    try {
      const response = await fetch(geocodeUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log("Click to get", data); // Log the response for debugging

      if (data && data.display_name) {
        setAddress(data.display_name); // Get the formatted address
      } else {
        setAddress("No address found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAMpAU4v81Zr9Kyml1Gts_iafgxXPZtoVw">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: lat, lng: lng }}
        zoom={20}
        mapTypeId="satellite"
      >
        <Marker
          position={{ lat: lat, lng: lng }}
          onMouseOver={() => {
            setShowInfoWindow(true);
            getAddressFromCoords(lat, lng); // Fetch the address on hover
          }}
          onMouseOut={() => setShowInfoWindow(false)} // Hide the InfoWindow when not hovering
        >
          {showInfoWindow && (
            <InfoWindow
              position={{ lat: lat, lng: lng }}
              onCloseClick={() => setShowInfoWindow(false)}
            >
              <div>
                <p>{address ? address : "Fetching address..."}</p>{" "}
                {/* Display the address */}
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    </LoadScript>
  );
};

export default SatelliteMap;
