import { NextRequest, NextResponse } from "next/server";
import DbConnect from "@/Utils/mongooesConnect";
import Blog from "@/Models/BlogCollection";

// GET single blog by slug
export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        await DbConnect();

        const blog: any = await Blog.findOne({
            slug: params.slug,
            isPublished: true,
        }).lean();

        if (!blog) {
            return NextResponse.json(
                { success: false, error: "Blog not found" },
                { status: 404 }
            );
        }

        // Convert _id and dates to strings
        const serializedBlog = {
            ...blog,
            _id: blog._id.toString(),
            createdAt: blog.createdAt?.toISOString(),
            updatedAt: blog.updatedAt?.toISOString(),
            publishedAt: blog.publishedAt?.toISOString(),
        };

        return NextResponse.json({
            success: true,
            data: serializedBlog,
        });
    } catch (error: any) {
        console.error("Error fetching blog:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
