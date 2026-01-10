"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Search,
    Calendar,
    Clock,
    Tag,
    TrendingUp,
    Sparkles,
    BookOpen,
    Filter,
    X,
    ChevronRight,
    User
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IBlog } from "../../../type";

interface BlogListClientProps {
    initialBlogs: IBlog[];
    categories: string[];
    tags: string[];
}

export default function BlogListClient({
    initialBlogs,
    categories,
    tags
}: BlogListClientProps) {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Filter blogs
    const filteredBlogs = initialBlogs.filter((blog) => {
        const matchesSearch = search
            ? blog.title.toLowerCase().includes(search.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(search.toLowerCase())
            : true;

        const matchesCategory = selectedCategory
            ? blog.category === selectedCategory
            : true;

        const matchesTag = selectedTag
            ? blog.tags.includes(selectedTag)
            : true;

        return matchesSearch && matchesCategory && matchesTag;
    });

    const featuredBlog = filteredBlogs[0];
    const regularBlogs = filteredBlogs.slice(1);

    return (
        <div className="min-h-screen bg-background">
            {/* Vibrant Hero Header */}
            <div className="relative bg-primary overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-40 h-40 bg-background rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-56 h-56 bg-accent rounded-full blur-3xl animate-pulse delay-75"></div>
                    <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-background rounded-full blur-2xl animate-pulse delay-150"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
                    {/* Top Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground text-sm font-semibold mb-6 border border-primary-foreground/30">
                        <Sparkles size={16} className="animate-pulse" />
                        <span>Insights & Stories</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary-foreground mb-6 tracking-tight">
                        Green
                        <br />
                        <span className="text-accent underline decoration-wavy decoration-2 underline-offset-4">Chronicles 🌿</span>
                    </h1>

                    <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Discover stories, tips, and insights about sustainable living and environmental conservation.
                    </p>

                    {/* Enhanced Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-colors" />
                            <Input
                                type="text"
                                placeholder="Search articles, topics, sustainability tips..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-14 pr-6 py-7 text-lg rounded-2xl shadow-2xl border-0 bg-background focus:ring-4 focus:ring-primary/50 transition-all placeholder:text-muted-foreground text-foreground"
                            />
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-primary-foreground/90">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">{initialBlogs.length}+ Articles</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">{categories.length} Categories</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">Expert Insights</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Filters Section */}
                <div className="mb-12 space-y-6">
                    {/* Categories */}
                    {categories.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Filter size={18} className="text-muted-foreground" />
                                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Categories</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Badge
                                    onClick={() => setSelectedCategory(null)}
                                    className={`cursor-pointer px-4 py-2 text-sm font-semibold transition-all hover:scale-105 ${!selectedCategory
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                        }`}
                                >
                                    All
                                </Badge>
                                {categories.map((category) => (
                                    <Badge
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`cursor-pointer px-4 py-2 text-sm font-semibold transition-all hover:scale-105 ${selectedCategory === category
                                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                            }`}
                                    >
                                        {category}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Tag size={18} className="text-muted-foreground" />
                                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Popular Tags</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {selectedTag && (
                                    <Badge
                                        onClick={() => setSelectedTag(null)}
                                        className="cursor-pointer bg-destructive hover:bg-destructive/90 text-destructive-foreground px-3 py-1.5 text-xs font-semibold"
                                    >
                                        <X size={12} className="mr-1" />
                                        Clear
                                    </Badge>
                                )}
                                {tags.slice(0, 15).map((tag) => (
                                    <Badge
                                        key={tag}
                                        onClick={() => setSelectedTag(tag)}
                                        className={`cursor-pointer px-3 py-1.5 text-xs font-semibold transition-all hover:scale-105 ${selectedTag === tag
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-card border-none hover:bg-secondary text-muted-foreground hover:text-foreground ring-1 ring-border"
                                            }`}
                                    >
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Featured Blog */}
                {featuredBlog && (
                    <section className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                                <TrendingUp className="text-accent-foreground" size={20} />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Article</h2>
                                <p className="text-sm text-muted-foreground">Must-read content</p>
                            </div>
                        </div>

                        <FeaturedBlogCard blog={featuredBlog} />
                    </section>
                )}

                {/* All Blogs Grid */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                                <BookOpen className="text-primary" size={20} />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Latest Articles</h2>
                                <p className="text-sm text-muted-foreground">Fresh perspectives</p>
                            </div>
                        </div>
                        <span className="text-sm font-semibold text-muted-foreground bg-muted px-4 py-2 rounded-full">
                            {filteredBlogs.length} Articles
                        </span>
                    </div>

                    {filteredBlogs.length === 0 ? (
                        <div className="text-center py-20 bg-card rounded-3xl border-2 border-dashed border-border">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">No articles found</h3>
                            <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
                            <Button
                                onClick={() => {
                                    setSearch("");
                                    setSelectedCategory(null);
                                    setSelectedTag(null);
                                }}
                                size="lg"
                                className="shadow-lg hover:shadow-xl"
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {regularBlogs.map((blog) => (
                                <BlogCard key={blog._id} blog={blog} />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* CTA Section */}
            <div className="bg-primary py-16 mt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                        Join Our Green Community
                    </h2>
                    <p className="text-lg text-primary-foreground/90 mb-8">
                        Get the latest articles and sustainability tips delivered to your inbox
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="px-6 py-6 text-base rounded-xl bg-background border-0 text-foreground"
                        />
                        <Button size="lg" variant="secondary" className="px-8 py-6 font-bold shadow-lg hover:shadow-xl whitespace-nowrap">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Featured Blog Card Component
function FeaturedBlogCard({ blog }: { blog: IBlog }) {
    return (
        <Link href={`/blog/${blog.slug}`}>
            <Card className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-card">
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-64 md:h-full overflow-hidden bg-muted">
                        <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute top-4 left-4">
                            <Badge className="bg-accent text-accent-foreground border-0 px-4 py-2 text-sm font-bold shadow-lg">
                                FEATURED ⭐
                            </Badge>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                        <Badge className="w-fit bg-secondary text-primary hover:bg-secondary/80 mb-4 px-3 py-1.5 text-xs font-bold uppercase">
                            {blog.category}
                        </Badge>

                        <h3 className="text-2xl md:text-3xl font-black text-card-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                            {blog.title}
                        </h3>

                        <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                            {blog.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-2">
                                <User size={16} />
                                <span className="font-medium">{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{new Date(blog.publishedAt || blog.createdAt || "").toLocaleDateString()}</span>
                            </div>
                            {blog.readTime && (
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{blog.readTime} min read</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                            <span>Read Full Article</span>
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

// Regular Blog Card Component
function BlogCard({ blog }: { blog: IBlog }) {
    return (
        <Link href={`/blog/${blog.slug}`}>
            <Card className="group relative flex flex-col overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 bg-card h-full hover:shadow-2xl hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-muted">
                    <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                        <Badge className="bg-background/95 backdrop-blur-sm text-foreground border-0 px-3 py-1.5 text-xs font-bold shadow-lg">
                            {blog.category}
                        </Badge>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                        {blog.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-grow">
                        {blog.excerpt}
                    </p>

                    {/* Tags */}
                    {blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {blog.tags.slice(0, 3).map((tag) => (
                                <Badge
                                    key={tag}
                                    className="bg-secondary text-muted-foreground hover:bg-secondary/80 px-2 py-1 text-xs font-medium"
                                >
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{new Date(blog.publishedAt || blog.createdAt || "").toLocaleDateString()}</span>
                        </div>
                        {blog.readTime && (
                            <div className="flex items-center gap-2">
                                <Clock size={14} />
                                <span>{blog.readTime} min</span>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </Link>
    );
}
