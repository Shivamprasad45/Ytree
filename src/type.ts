export interface IBlog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    author: string;
    tags: string[];
    category: string;
    isPublished: boolean;
    publishedAt?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
    readTime?: number;
    createdAt?: string;
    updatedAt?: string;
}
