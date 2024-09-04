"use server";

import PlantsCoordinates from "@/Models/CoordinatsPlants";
import React from "react";
import dynamic from "next/dynamic";
// Define the type for coordinates
type Coordinate = {
  lat: number;
  lng: number;
  placeName: string;
};
const MapComponent = dynamic(() => import("@/app/Components/Map_components"), {
  ssr: false,
});
const TreeDetailsPage: React.FC = async () => {
  // Fetch coordinates from the database, including only lat, long, and commonName fields
  const coordinatesFromDb = await PlantsCoordinates.find(
    {},
    { _id: 0, late: 1, long: 1, commonName: 1 }
  ).exec();

  // Transform data to match the expected format
  const coordinates: Coordinate[] = coordinatesFromDb.map((coord) => ({
    lat: coord.late,
    lng: coord.long,
    placeName: coord.commonName,
  }));

  // If no coordinates found, display a message
  if (coordinates.length === 0) {
    return <p>No coordinates found.</p>;
  }

  return (
    <div>
      <h1>All trees where our trees are available</h1>
      <MapComponent coordinates={coordinates} />
    </div>
  );
};

export default TreeDetailsPage;
