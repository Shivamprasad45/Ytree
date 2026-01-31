import Tree_details from "@/app/Components/tree_details";
import { Metadata } from "next";
import React from "react";
import Tree from "@/Models/TreeCollection";
import DbConnect from "@/Utils/mongooesConnect";
import { notFound } from "next/navigation";

async function getTreeData(id: string) {
  try {
    await DbConnect();
    const tree = await Tree.findOne({
      _id: id,
      deletedAt: null,
      isPublished: true,
    }).lean();

    if (!tree) return null;

    // Serialize Mongoose document to plain JSON
    return JSON.parse(JSON.stringify(tree));
  } catch (error) {
    console.error("Error fetching tree data:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | undefined> {
  const PlantDetails = await getTreeData(params.id);

  if (!PlantDetails) {
    return undefined;
  }

  return {
    title: PlantDetails.seoTitle,
    description: PlantDetails.seoDescription,
    openGraph: {
      type: "website",
      url: `${process.env.URL}/TreeDetiles/${params.id}`,
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
  const PlantDetails = await getTreeData(params.id);

  if (!PlantDetails) {
    notFound();
  }

  return <Tree_details PlantDetails={PlantDetails} />;
};

export default Page;
