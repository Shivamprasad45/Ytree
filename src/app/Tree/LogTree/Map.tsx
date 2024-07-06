"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { Use_current_location } from "@/app/Featuers/TreeOrder/TreeOrderSlice";

// Create a custom icon
const customIcon = new L.Icon({
  iconUrl:
    "https://img.icons8.com/?size=100&id=6ozQ6RVpK3sa&format=png&color=000000",
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
  shadowUrl:
    "https://t3.ftcdn.net/jpg/02/19/36/90/360_F_219369048_1MQ8eZynFltpjKqzbm6bHMa4k2FfU0AM.jpg",
  shadowSize: [41, 41], // Size of the shadow
  shadowAnchor: [20, 20], // Point of the shadow
});

const MapViewUpdater = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();
  map.setView(coords, 13);
  return null;
};

const Map: React.FC = () => {
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState<
    [number, number] | null
  >(null);
  const [currentLocationInfo, setCurrentLocationInfo] = useState<string>("");

  const handleMapClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log(position.coords.latitude, "lat");
          console.log(position.coords.longitude, "lon");
          const coords: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setCurrentLocation(coords);

          // Fetch area information for the current location
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=json`
          );
          const data = await response.json();
          console.log("clicked");
          if (data && data.display_name) {
            setCurrentLocationInfo(data.display_name);
            dispatch(
              Use_current_location({
                long: coords[1], // Longitude
                late: coords[0], // Latitude
                Address: data.display_name,
              })
            );
          } else {
            setCurrentLocationInfo("No area information available.");
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  };

  console.log(currentLocation, currentLocationInfo, "All Inflammation");

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {currentLocation && (
          <>
            <Marker position={currentLocation} icon={customIcon}>
              <Popup>
                Your Current Location: <br />
                Latitude: {currentLocation[0]}, Longitude: {currentLocation[1]}
                <br />
                Area: {currentLocationInfo}
              </Popup>
            </Marker>
            <MapViewUpdater coords={currentLocation} />
          </>
        )}
      </MapContainer>
      <Button onClick={handleMapClick}>Use current location</Button>
    </div>
  );
};

export default Map;
