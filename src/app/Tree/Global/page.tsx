"use server"; // Changed from "use server" to "use client" for client-side rendering

import React from "react";
import dynamic from "next/dynamic";
import PlantsCoordinates from "@/Models/CoordinatsPlants";
import { User } from "@/Models/SignupModel";

// Define the type for coordinates
type Coordinate = {
  lat: number;
  lng: number;
  placeName: string;
  UserId: string; // Added UserId field for filtering by user
  name: string;
};

export interface All_Users {
  UserId: string; // Added UserId field for filtering by user
  name: string;
}
// Dynamically import the MapComponent to improve performance
const MapComponent = dynamic(() => import("@/app/Components/Map_components"), {
  ssr: false,
});

const TreeDetailsPage: React.FC = async () => {
  // Fetch coordinates from the database
  const coordinatesFromDb = await PlantsCoordinates.find(
    {},
    { _id: 0, late: 1, long: 1, commonName: 1, UserId: 1, Plant_Addresses: 1 }
  ).exec();

  const All_user = await User.find(
    {},
    { _id: 1, firstName: 1, lastName: 1 }
  ).exec();
  console.log(All_user[1].firstName, "Alls");

  // Transform data to match the expected format
  const coordinates: Coordinate[] = coordinatesFromDb.map((coord) => ({
    lat: coord.late,
    lng: coord.long,
    placeName: coord.Plant_Addresses,
    UserId: coord.UserId, // Added UserId field for filtering by user
    name: coord.commonName,
  }));

  const All_use: All_Users[] = All_user.map((user) => ({
    UserId: user._id.toString(), // Added UserId field for filtering by user
    name: user.firstName + " " + user.lastName, // Added name field for displaying user name in the map markers
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Trees Locations</h1>
      {coordinates.length === 0 ? (
        <p className="text-lg text-gray-600">No coordinates found.</p>
      ) : (
        <MapComponent coordinates={coordinates} All={All_use} />
      )}
    </div>
  );
};

export default TreeDetailsPage;
