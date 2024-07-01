"use client";

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

// MapClickHandler Component
const MapClickHandler: React.FC<{
  onMapClick: (latlng: [number, number]) => void;
}> = ({ onMapClick }) => {
  useMapEvent("click", (event) => {
    onMapClick([event.latlng.lat, event.latlng.lng]);
  });
  return null;
};

// MapViewUpdater Component
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

const Map: React.FC = () => {
  const [markers, setMarkers] = useState<[number, number][]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<[number, number] | null>(
    null
  );
  const [currentLocation, setCurrentLocation] = useState<
    [number, number] | null
  >(null);
  console.log(currentLocation, "current location");
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  }, []);

  const handleSearch = async () => {
    if (!searchQuery) return;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      setSearchResult([parseFloat(lat), parseFloat(lon)]);
    }
  };

  const handleMapClick = (latlng: [number, number]) => {
    setMarkers([...markers, latlng]);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search for a place"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler onMapClick={handleMapClick} />
        <MapViewUpdater center={searchResult || currentLocation} />
        {currentLocation && (
          <Marker position={currentLocation} icon={customIcon}>
            <Popup>
              Your Current Location: <br />
              Latitude: {currentLocation[0]}, Longitude: {currentLocation[1]}
            </Popup>
          </Marker>
        )}
        {searchResult && (
          <Marker position={searchResult} icon={customIcon}>
            <Popup>
              Searched Location: <br />
              Latitude: {searchResult[0]}, Longitude: {searchResult[1]}
            </Popup>
          </Marker>
        )}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} icon={customIcon}>
            <Popup>
              Marker {index + 1}: <br />
              Latitude: {marker[0]}, Longitude: {marker[1]}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
