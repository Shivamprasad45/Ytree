"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the Map component
const Map = dynamic(() => import("@/app/Components/Map_components"), {
  ssr: false, // This disables server-side rendering for this component
  loading: () => <p>Loading map...</p>, // Optional: display a loading message or component
});

const Page: React.FC = () => {
  return (
    <div>
      <Map />
    </div>
  );
};

export default Page;
