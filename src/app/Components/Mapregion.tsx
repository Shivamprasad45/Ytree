"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define your custom icon
const customIcon = new L.Icon({
  iconUrl:
    "https://img.icons8.com/?size=100&id=6ozQ6RVpK3sa&format=png&color=000000",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapProps {
  searchQuery?: string; // Make searchQuery optional
}

const MapComponent: React.FC<MapProps> = ({ searchQuery }) => {
  const [searchResult, setSearchResult] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery) {
        return; // Exit early if searchQuery is undefined or null
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchQuery
          )}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setSearchResult([parseFloat(lat), parseFloat(lon)]);
        } else {
          setSearchResult(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setSearchResult(null);
      }
    };

    fetchData();
  }, [searchQuery]);
  const MapViewUpdater: React.FC<{ center: [number, number] | null }> = ({
    center,
  }) => {
    const map = useMap();

    useEffect(() => {
      if (center) {
        map.setView(center, map.getZoom());
      }
    }, [center, map]);

    return null;
  };
  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]} // Default center if searchResult is null or undefined
        zoom={5}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapViewUpdater center={searchResult!} />
        {searchResult && (
          <Marker position={searchResult} icon={customIcon}>
            <Popup>
              Searched Location: <br />
              Latitude: {searchResult[0]}, Longitude: {searchResult[1]}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
