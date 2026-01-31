import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBlog } from "../../../type";

interface BlogsResponse {
    success: boolean;
    data: IBlog[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

interface BlogResponse {
    success: boolean;
    data: IBlog;
}

export const BlogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["Blog"],
    endpoints: (builder) => ({
        // Get all blogs with optional filters
        getBlogs: builder.query<BlogsResponse, {
            category?: string;
            tag?: string;
            limit?: number;
            page?: number
        }>({
            query: ({ category, tag, limit = 10, page = 1 }) => {
                const params = new URLSearchParams();
                if (category) params.append("category", category);
                if (tag) params.append("tag", tag);
                params.append("limit", limit.toString());
                params.append("page", page.toString());
                return `/blog?${params.toString()}`;
            },
            providesTags: ["Blog"],
        }),

        // Get single blog by slug
        getBlogBySlug: builder.query<BlogResponse, string>({
            query: (slug) => `/blog/${slug}`,
            providesTags: (result, error, slug) => [{ type: "Blog", id: slug }],
        }),

        // Create new blog (for admin)
        createBlog: builder.mutation<BlogResponse, Partial<IBlog>>({
            query: (blog) => ({
                url: "/blog",
                method: "POST",
                body: blog,
            }),
            invalidatesTags: ["Blog"],
        }),
    }),
});

export const {
    useGetBlogsQuery,
    useGetBlogBySlugQuery,
    useCreateBlogMutation,
} = BlogApi;
