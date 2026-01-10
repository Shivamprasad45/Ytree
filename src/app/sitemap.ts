import { MetadataRoute } from "next";
import Tree from "@/Models/TreeCollection";
import Blog from "@/Models/BlogCollection";
import DbConnect from "@/Utils/mongooesConnect";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.URL || "https://vanagrow.com";

  await DbConnect();

  // Fetch all trees
  const trees = await Tree.find({}, { id: 1, updatedAt: 1 }).lean();
  const treeUrls = trees.map((tree: any) => ({
    url: `${siteUrl}/TreeDetiles/${tree.id}`,
    lastModified: tree.updatedAt ? new Date(tree.updatedAt).toISOString() : new Date().toISOString(),
  }));

  // Fetch all published blogs
  const blogs = await Blog.find({ isPublished: true }, { slug: 1, updatedAt: 1 }).lean();
  const blogUrls = blogs.map((blog: any) => ({
    url: `${siteUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : new Date().toISOString(),
  }));

  // Static routes
  const staticRoutes = [
    "",
    "/About",
    "/login",
    "/Signup",
    "/Tree/Global",
    "/Tree/Shop",
    "/Tree/Mytree",
    "/affiliate-shop",
    "/blog",
    "/how-it-works",
    "/Contact",
    "/PrivacyPolicy",
    "/Terms",
    "/refund",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...staticRoutes, ...treeUrls, ...blogUrls];
}
