"use server";
import React from "react";
import MapComponent from "@/app/Components/Map_components";
import { All_Users, Coordinate } from "../../../../type";
import { fetchCoords } from "@/app/lib/getall";
// Move fetchCoords to a helper file

export default async function Page() {
  // Fetch the data using the helper function
  const {
    coordsData,
    usersData,
  }: { coordsData: Coordinate[]; usersData: All_Users[] } = await fetchCoords();

  return <MapComponent All_coords={coordsData} All_users={usersData} />;
}
