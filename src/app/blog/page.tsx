import React from "react";
import Blog from "@/Models/BlogCollection";
import DbConnect from "@/Utils/mongooesConnect";
import BlogListClient from "./BlogListClient";
import { IBlog } from "../../type";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Blog | Vanagrow - Eco-Friendly Living & Sustainability Tips",
    description: "Discover expert insights on sustainable living, eco-friendly practices, and environmental conservation. Join our green revolution.",
    keywords: ["sustainability", "eco-friendly", "green living", "environment", "tree planting"],
    openGraph: {
        title: "Blog | Vanagrow",
        description: "Expert insights on sustainable living and environmental conservation",
        type: "website",
    },
};

async function getBlogs() {
    try {
        await DbConnect();

        const blogs = await Blog.find({ isPublished: true })
            .sort({ publishedAt: -1 })
            .limit(50)
            .lean();

        // Get unique categories and tags
        const allCategories = await Blog.distinct("category", { isPublished: true });
        const allTags = await Blog.distinct("tags", { isPublished: true });

        return {
            blogs: blogs.map((blog: any) => ({
                ...blog,
                _id: blog._id.toString(),
                createdAt: blog.createdAt?.toISOString(),
                updatedAt: blog.updatedAt?.toISOString(),
                publishedAt: blog.publishedAt?.toISOString(),
            })) as IBlog[],
            categories: allCategories,
            tags: allTags,
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return {
            blogs: [],
            categories: [],
            tags: [],
        };
    }
}

export default async function BlogPage() {
    const { blogs, categories, tags } = await getBlogs();

    return <BlogListClient initialBlogs={blogs} categories={categories} tags={tags} />;
}
