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
  iconUrl: "/Map_icon/pin.webp",
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
  shadowUrl: "/Map_icon/marker-shadow.webp",
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
  >([23, 45]);
  const [currentLocationInfo, setCurrentLocationInfo] = useState<string>("");

  const handleMapClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          console.log(coords[0], "long");
          console.log(coords[1], "late");
          console.log(coords, "coords");
          setCurrentLocation(coords);

          // Fetch area information for the current location
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=json`
          );

          const data = await response.json();
          console.log(data, "clicked");
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

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "200px", width: "100%" }}
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

      {/* Button to use current location */}

      <div className="pt-3 pl-32 ">
        <Button onClick={handleMapClick}>Use current location</Button>
      </div>
    </div>
  );
};

export default Map;
