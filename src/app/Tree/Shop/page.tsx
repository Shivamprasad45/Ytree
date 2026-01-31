import React from "react";
import Shop from "../../Featuers/Tree/Components/Shop";
import Tree from "@/Models/TreeCollection";
import DbConnect from "@/Utils/mongooesConnect";

const Page = async () => {
  await DbConnect();

  // Fetch trees, filtering out deleted and unpublished ones
  const trees = await Tree.find({
    deletedAt: null,
    isPublished: true,
  }).lean();

  // Serialize Mongoose documents to plain JSON for Client Component
  const initialTrees = JSON.parse(JSON.stringify(trees));

  return (
    <div>
      <Shop initialTrees={initialTrees} />
    </div>
  );
};

export default Page;
