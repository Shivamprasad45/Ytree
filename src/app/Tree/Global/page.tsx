"use server";
import MapComponent from "@/app/Components/Map_components";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import MapComponent
// const Map_components = dynamic(
//   () => import("@/app/Components/Map_components"),
//   {
//     ssr: false, // Disable server-side rendering if needed
//   }
// );

// lib/fetchCoords.ts (Server-side)
export async function fetchCoords() {
  const coordsResponse = await fetch(
    "https://ytree.vercel.app/api/Tree/All_coords",
    {
      cache: "no-cache",
    }
  );
  const coordsData = await coordsResponse.json();

  const usersResponse = await fetch(
    "https://ytree.vercel.app/api/Tree/All_users",
    {
      cache: "no-cache",
    }
  );
  const usersData = await usersResponse.json();

  return { coordsData, usersData };
}

export default async function Page() {
  const { coordsData, usersData } = await fetchCoords();

  return <MapComponent All_coords={coordsData} All_users={usersData} />;
}
