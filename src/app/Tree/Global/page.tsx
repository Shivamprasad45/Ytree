import dynamic from "next/dynamic";
import React from "react";

// Dynamically import MapComponent
const Map_components = dynamic(
  () => import("@/app/Components/Map_components"),
  {
    ssr: false, // Disable server-side rendering if needed
  }
);

const page = () => {
  return (
    <div>
      <Map_components />
    </div>
  );
};

export default page;
