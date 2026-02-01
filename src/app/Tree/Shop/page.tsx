import React from "react";
import Shop from "../../Featuers/Tree/Components/Shop";
import Tree from "@/Models/TreeCollection";
import DbConnect from "@/Utils/mongooesConnect";
import GoogleAd from "../../Components/GoogleAd";

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
    <div className="container mx-auto px-4">
      {/* Ad Unit - Top of Shop Page */}
      <GoogleAd slotId="8932948273" /> {/* Replace with actual Slot ID from AdSense */}

      <Shop initialTrees={initialTrees} />

      {/* Ad Unit - Bottom of Shop Page */}
      <GoogleAd slotId="8932948273" />
    </div>
  );
};

export default Page;
