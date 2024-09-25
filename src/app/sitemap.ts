import { MetadataRoute } from "next";
import { TreeInfo } from "../../type";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.URL || "https://vanagrow.com"; // Fallback in case the URL isn't set

  const All_Tree: TreeInfo[] = await fetch(`${siteUrl}/api/Tree/AllTree`)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Failed to fetch tree data:", error);
      return []; // Fallback to an empty array if the API request fails
    });

  const All_Tree_Details = All_Tree.map((tree) => ({
    url: `${siteUrl}/Tree/Details/${tree.id}`, // Frontend URL for the tree details page
    lastModified: new Date().toISOString(),
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteUrl}/About`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteUrl}/login`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteUrl}/Signup`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteUrl}/Tree/Global`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteUrl}/Tree/Shop`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteUrl}/Tree/Mytree`,
      lastModified: new Date().toISOString(),
    },
    ...All_Tree_Details, // Include dynamic tree details
  ];
}
