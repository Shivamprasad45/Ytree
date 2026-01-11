import { NextRequest, NextResponse } from "next/server";
import DbConnect from "@/Utils/mongooesConnect";
import Blog from "@/Models/BlogCollection";

// GET all published blogs
export async function GET(request: NextRequest) {
    try {
        await DbConnect();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const tag = searchParams.get("tag");
        const limit = parseInt(searchParams.get("limit") || "10");
        const page = parseInt(searchParams.get("page") || "1");

        // Build query
        const query: any = { isPublished: true };
        if (category) query.category = category;
        if (tag) query.tags = tag;

        // Fetch blogs with pagination
        const blogs = await Blog.find(query)
            .sort({ publishedAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .lean();

        const total = await Blog.countDocuments(query);

        // Convert _id and dates to strings
        const serializedBlogs = blogs.map((blog: any) => ({
            ...blog,
            _id: blog._id.toString(),
            createdAt: blog.createdAt?.toISOString(),
            updatedAt: blog.updatedAt?.toISOString(),
            publishedAt: blog.publishedAt?.toISOString(),
        }));

        return NextResponse.json({
            success: true,
            data: serializedBlogs,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// POST - Create new blog (optional, for admin)
export async function POST(request: NextRequest) {
    try {
        await DbConnect();
        const body = await request.json();

        const blog = await Blog.create(body);

        return NextResponse.json({
            success: true,
            data: {
                ...blog.toObject(),
                _id: blog._id.toString(),
            },
        });
    } catch (error: any) {
        console.error("Error creating blog:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
