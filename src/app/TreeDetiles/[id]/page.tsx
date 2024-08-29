import Tree_details from "@/app/Components/tree_details";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: {
    absolute: "Ytree details",
  },
  description: "View details of a specific tree",
  keywords: ["tree", "details", "Yplant"],
};

const Page = async ({ params }: { params: { id: string } }) => {
  // Fetch data here

  const response = await fetch(
    `http://localhost:3000/api/Tree/TreeDetails?id=${params.id}`
  );
  const PlantDetails = await response.json();

  return <Tree_details PlantDetails={PlantDetails} />;
};

export default Page;
