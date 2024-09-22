/**
 * The function `sitemap` generates a sitemap with URLs for the homepage, about page, and tree details
 * based on fetched data.
 * @returns The `sitemap` function is returning an array of objects with URLs and last modified dates.
 * The array includes objects for the homepage ("/"), the About page ("/About"), and additional objects
 * for each tree in the `All_Tree` array fetched from the API. Each tree object contains a URL with the
 * tree's ID and a last modified date.
 */
import { MetadataRoute } from "next";
import { TreeInfo } from "../../type";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const All_Tree: TreeInfo[] = await fetch(
    `${process.env.URL}/api/Tree/AllTree`
  ).then((res) => res.json());

  const All_Tree_Details = All_Tree.map((tree) => ({
    url: `${process.env.URL}/api/Tree/TreeDetails?id=${tree.id}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    {
      url: "/",
      lastModified: new Date().toISOString(),
    },
    {
      url: "/About",
      lastModified: new Date().toISOString(),
    },

    {
      url: "/login",
      lastModified: new Date().toISOString(),
    },
    {
      url: "/Signup",
      lastModified: new Date().toISOString(),
    },
    {
      url: "/Tree/Global",
      lastModified: new Date().toISOString(),
    },
    {
      url: "/Tree/Shop",
      lastModified: new Date().toISOString(),
    },
    {
      url: "/Tree/Mytree",
      lastModified: new Date().toISOString(),
    },
    ...All_Tree_Details,
  ];
}
