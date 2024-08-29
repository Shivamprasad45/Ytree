import Tree_details from "@/app/Components/tree_details";
import { Metadata } from "next";

import React from "react";
import { TreeInfo } from "../../../../type";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | undefined> {
  // Fetch data here
  console.log(params.id, "GET");
  const response = await fetch(
    `http://localhost:3000/api/Tree/TreeDetails?id=${params.id}`
  );
  const PlantDetails: TreeInfo = await response.json();
  if (PlantDetails === undefined) {
    return undefined;
  }

  return {
    title: PlantDetails.seoTitle,
    description: PlantDetails.seoDescription,
    openGraph: {
      type: "website",
      url: `http://localhost:3000/api/Tree/TreeDetails?id=${params.id}`,
      title: PlantDetails.seoTitle,
      description: PlantDetails.seoDescription,
      locale: "en_US",
      images: [
        {
          url: PlantDetails.imageURL,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const Page = async ({ params }: { params: { id: string } }) => {
  // Fetch data here

  const response = await fetch(
    `http://localhost:3000/api/Tree/TreeDetails?id=${params.id}`
  );
  const PlantDetails = await response.json();

  return <Tree_details PlantDetails={PlantDetails} />;
};

export default Page;
