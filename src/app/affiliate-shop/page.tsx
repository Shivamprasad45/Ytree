import React from "react"; // Removed "use client"
import Tree from "@/Models/TreeCollection";
import DbConnect from "@/Utils/mongooesConnect";
import AffiliateShopClient from "./AffiliateShopClient";
import { TreeInfo } from "../../../type";

// Force dynamic rendering if we want fresh data on every request, 
// or let Next.js cache it if we prefer static/ISR.
// Given it's a shop, maybe we want revalidation every hour or so, but user asked for SSR.
export const dynamic = "force-dynamic";

export const metadata = {
    title: "Eco-Friendly Affiliate Shop | Vanagrow",
    description: "Shop from our curated list of eco-friendly products and help plant trees with every purchase.",
};

async function getAffiliateTrees() {
    try {
        await DbConnect();
        // Fetch only trees that have an affiliate link
        // We use lean() for better performance and to get POJOs
        const trees = await Tree.find({
            AffiliateLink: { $exists: true, $ne: "" }
        }).lean();

        // Convert _id and dates to strings to avoid serialization issues
        return trees.map((tree: any) => ({
            ...tree,
            _id: tree._id.toString(),
            createdAt: tree.createdAt?.toISOString(),
            updatedAt: tree.updatedAt?.toISOString(),
            deletedAt: tree.deletedAt?.toISOString(),
        })) as TreeInfo[];
    } catch (error) {
        console.error("Error fetching affiliate trees:", error);
        return [];
    }
}

export default async function AffiliateShopPage() {
    const trees = await getAffiliateTrees();

    return <AffiliateShopClient initialTrees={trees} />;
}
