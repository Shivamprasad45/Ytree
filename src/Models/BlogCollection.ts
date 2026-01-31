import mongoose, { Document, Model, Schema } from "mongoose";

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a title for the blog"],
            maxlength: [200, "Title cannot be more than 200 characters"],
        },
        slug: {
            type: String,
            required: [true, "Please provide a slug"],
            unique: true,
            lowercase: true,
        },
        subtitle: {
            type: String,
            maxlength: [300, "Subtitle cannot be more than 300 characters"],
        },
        content: {
            type: String,
            required: [true, "Please provide blog content"],
        },
        excerpt: {
            type: String,
            required: [true, "Please provide an excerpt"],
            maxlength: [300, "Excerpt cannot be more than 300 characters"],
        },
        featuredImage: {
            type: String,
            required: [true, "Please provide a featured image"],
        },
        featuredVideo: {
            type: String,
        },
        author: {
            type: String,
            required: [true, "Please provide author name"],
        },
        tags: {
            type: [String],
            default: [],
        },
        category: {
            type: String,
            required: [true, "Please provide a category"],
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
        publishedAt: {
            type: Date,
        },
        seoTitle: {
            type: String,
            maxlength: [60, "SEO Title cannot be more than 60 characters"],
        },
        seoDescription: {
            type: String,
            maxlength: [160, "SEO Description cannot be more than 160 characters"],
        },
        seoKeywords: {
            type: [String],
            default: [],
        },
        readTime: {
            type: Number,
            default: 5,
        },
        sections: {
            type: [{
                id: { type: String, required: true },
                title: { type: String, required: true },
                order: { type: Number, required: true },
                content: { type: String, default: "" },
                youtubeUrl: { type: String },
                imageUrl: { type: String },
                subsections: {
                    type: [{
                        id: { type: String, required: true },
                        title: { type: String, required: true },
                        order: { type: Number, required: true },
                        content: { type: String, default: "" },
                        youtubeUrl: { type: String },
                        imageUrl: { type: String }
                    }],
                    default: []
                }
            }],
            default: [],
        },
        customFields: {
            type: Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

// Create index for better search performance
BlogSchema.index({ slug: 1 });
BlogSchema.index({ isPublished: 1, publishedAt: -1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ tags: 1 });

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
