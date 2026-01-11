"use client";

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../Components/Blog/Sidebar";
import ArticleContent from "../../Components/Blog/ArticleContent";
import RelatedSection from "../../Components/Blog/RelatedSection";
import { IBlog } from "../../../../type";
import { Author, ImpactStats, RelatedArticle } from "../../Components/Blog/types";

interface BlogDetailClientProps {
    blog: IBlog;
    relatedBlogs: IBlog[];
}

export default function BlogDetailContent({ blog, relatedBlogs }: BlogDetailClientProps) {
    // Hardcoded mock data as requested to fill in missing fields from IBlog
    const authorValues: Author = {
        name: blog.author || "Sarah Jenkins",
        role: "Chief Ecologist",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        date: new Date(blog.publishedAt || blog.createdAt || Date.now()).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }),
        bio: "Sarah has over 15 years of experience in tropical forest restoration. She leads Vanagrow's biodiversity initiatives in the Amazon basin."
    };

    const impactValues: ImpactStats = {
        hectares: 5400,
        trees: 125000,
        jobs: 340
    };

    // Transform relatedBlogs (IBlog[]) to RelatedArticle[]
    const relatedArticles: RelatedArticle[] = relatedBlogs.map(rb => ({
        id: rb._id,
        title: rb.title,
        category: rb.category,
        description: rb.excerpt,
        image: rb.featuredImage
    }));

    // If fewer than 3 related articles, fill with mock data
    if (relatedArticles.length < 3) {
        const mockRelated = [
            {
                id: 'mock-1',
                title: 'The Future of Carbon Credits',
                category: 'Market Trends',
                description: 'How blockchain technology is bringing transparency to the voluntary carbon market and ensuring real impact.',
                image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 'mock-2',
                title: 'Indigenous Wisdom in Modern Conservation',
                category: 'Community',
                description: 'Learning from the guardians of the forest: how traditional knowledge is shaping our restoration strategies.',
                image: 'https://images.unsplash.com/photo-1596392927818-f2a893c52402?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 'mock-3',
                title: 'Water Cycles and Reforestation',
                category: 'Science',
                description: 'Understanding the critical link between tree cover and regional rainfall patterns in agricultural zones.',
                image: 'https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            }
        ];
        // Add only enough mocks to reach 3
        const needed = 3 - relatedArticles.length;
        relatedArticles.push(...mockRelated.slice(0, needed));
    }

    return (
        <div className="min-h-screen">
            {/* Header placeholder if needed, otherwise assumed handled by layout */}

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
                {/* Breadcrumbs */}
                <nav className="mb-8 flex gap-2 text-sm font-medium">
                    <Link href="/" className="text-vanagrow-accent hover:text-primary transition-colors">Home</Link>
                    <span className="text-vanagrow-accent">/</span>
                    <Link href="/blog" className="text-vanagrow-accent hover:text-primary transition-colors">Sustainability Blog</Link>
                    <span className="text-vanagrow-accent">/</span>
                    <span className="text-slate-900 truncate max-w-[200px]">{blog.title}</span>
                </nav>

                {/* Hero Section */}
                <section className="relative mb-16 overflow-hidden rounded-2xl shadow-2xl group">
                    <div className="aspect-[21/9] w-full lg:aspect-[3/1] relative">
                        <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                            sizes="(max-width: 1280px) 100vw, 1280px"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute bottom-0 left-0 p-8 sm:p-12 lg:p-16 w-full">
                            <span className="mb-4 inline-block rounded-full bg-primary px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-vanagrow-dark shadow-sm">
                                {blog.category}
                            </span>
                            <h1 className="max-w-4xl font-display text-3xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-7xl drop-shadow-lg">
                                {blog.title}
                            </h1>
                        </div>
                    </div>
                </section>

                {/* Content Grid */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-20">
                    {/* Pass the constructed Author object to ArticleContent */}
                    <ArticleContent author={authorValues} />
                    {/* Pass constructed ImpactStats and Tags to Sidebar */}
                    <Sidebar impact={impactValues} tags={blog.tags} />
                </div>

                {/* Related Articles Section */}
                <RelatedSection articles={relatedArticles} />
            </main>

            {/* Footer placeholder if needed, otherwise assumed handled by layout */}
        </div>
    );
};
