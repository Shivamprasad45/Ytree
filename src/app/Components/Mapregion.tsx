"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Coordinate } from "../../../type";

// Define your custom icon
const customIcon = new L.Icon({
  iconUrl:
    "https://img.icons8.com/?size=100&id=6ozQ6RVpK3sa&format=png&color=000000",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapComponent = ({ data }: { data: Coordinate[] }) => {
  const [searchResult, setSearchResult] = useState<[number, number] | null>(
    null
  );

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

  const addMarkersWithPopup = (map: L.Map) => {
    data?.forEach((coord) => {
      const marker = L.marker([coord.late, coord.long], { icon: customIcon });
      marker.bindPopup(`
        <strong>${coord.commonName}</strong><br/>
        ${coord.Plant_Addresses}<br/>
        Latitude: ${coord.late}, Longitude: ${coord.long}
      `);
      marker.addTo(map);
    });
  };

  const MarkersLayer = () => {
    const map = useMap();

    useEffect(() => {
      if (map) {
        addMarkersWithPopup(map);
      }
    }, [map]);

    return null;
  };

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]} // Default center
        zoom={5}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {data && <MapViewUpdater center={[data[0].late, data[0].long]} />}

        <MarkersLayer />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
