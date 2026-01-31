import React from "react";
import { notFound } from "next/navigation";
import Blog from "@/Models/BlogCollection";
import DbConnect from "@/Utils/mongooesConnect";
import BlogDetailClient from "./BlogDetailContent";
import { IBlog } from "@/type";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

// Generate metadata for SEO
export async function generateMetadata({
    params
}: {
    params: { slug: string }
}): Promise<Metadata> {
    try {
        await DbConnect();
        const blog: any = await Blog.findOne({
            slug: params.slug,
            isPublished: true
        }).lean();

        if (!blog) {
            return {
                title: "Blog Not Found | Vanagrow",
            };
        }

        return {
            title: blog.seoTitle || blog.title,
            description: blog.seoDescription || blog.excerpt,
            keywords: blog.seoKeywords || blog.tags,
            openGraph: {
                title: blog.title,
                description: blog.excerpt,
                images: [blog.featuredImage],
                type: "article",
                publishedTime: blog.publishedAt?.toISOString(),
                authors: [blog.author],
                tags: blog.tags,
            },
            twitter: {
                card: "summary_large_image",
                title: blog.title,
                description: blog.excerpt,
                images: [blog.featuredImage],
            },
        };
    } catch (error) {
        return {
            title: "Blog | Vanagrow",
        };
    }
}

async function getBlog(slug: string) {
    try {
        await DbConnect();

        const blog: any = await Blog.findOne({
            slug,
            isPublished: true
        }).lean();

        if (!blog) {
            return null;
        }

        // Get related blogs (same category, different slug)
        const relatedBlogs = await Blog.find({
            category: blog.category,
            slug: { $ne: slug },
            isPublished: true,
        })
            .limit(3)
            .lean();

        return {
            blog: {
                ...blog,
                _id: blog._id.toString(),
                createdAt: blog.createdAt?.toISOString(),
                updatedAt: blog.updatedAt?.toISOString(),
                publishedAt: blog.publishedAt?.toISOString(),
            } as IBlog,
            relatedBlogs: relatedBlogs.map((b: any) => ({
                ...b,
                _id: b._id.toString(),
                createdAt: b.createdAt?.toISOString(),
                updatedAt: b.updatedAt?.toISOString(),
                publishedAt: b.publishedAt?.toISOString(),
            })) as IBlog[],
        };
    } catch (error) {
        console.error("Error fetching blog:", error);
        return null;
    }
}

export default async function BlogDetailPage({
    params
}: {
    params: { slug: string }
}) {
    const data = await getBlog(params.slug);

    if (!data) {
        notFound();
    }

    return <BlogDetailClient blog={data.blog} relatedBlogs={data.relatedBlogs} />;
}
