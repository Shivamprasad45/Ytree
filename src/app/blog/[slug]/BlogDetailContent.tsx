"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Calendar,
    Clock,
    User,
    Tag,
    Share2,
    ArrowLeft,
    ChevronRight,
    Leaf,
    Facebook,
    Twitter,
    Linkedin,
    Link2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IBlog } from "../../../../type";
import { useState } from "react";

interface BlogDetailClientProps {
    blog: IBlog;
    relatedBlogs: IBlog[];
}

export default function BlogDetailContent({ blog, relatedBlogs }: BlogDetailClientProps) {
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    const handleShare = (platform: string) => {
        const text = encodeURIComponent(blog.title);
        const url = encodeURIComponent(shareUrl);

        const shareUrls: { [key: string]: string } = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], "_blank", "width=600,height=400");
        }
    };

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-40 h-40 bg-background rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-56 h-56 bg-accent rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    {/* Back Button */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground mb-8 font-semibold transition-all hover:gap-3"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Blog</span>
                    </Link>

                    {/* Category Badge */}
                    <Badge className="bg-background/20 backdrop-blur-sm text-primary-foreground border border-primary-foreground/30 px-4 py-2 text-sm font-bold mb-6">
                        {blog.category}
                    </Badge>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 text-primary-foreground/90 mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <User size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-primary-foreground/70">Written by</p>
                                <p className="font-bold">{blog.author}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span className="font-medium">
                                {new Date(blog.publishedAt || blog.createdAt || "").toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                        {blog.readTime && (
                            <div className="flex items-center gap-2">
                                <Clock size={18} />
                                <span className="font-medium">{blog.readTime} min read</span>
                            </div>
                        )}
                    </div>

                    {/* Share Button */}
                    <div className="relative">
                        <Button
                            onClick={() => setShowShareMenu(!showShareMenu)}
                            variant="secondary"
                            size="lg"
                            className="gap-2 backdrop-blur-sm border border-primary-foreground/30"
                        >
                            <Share2 size={18} />
                            <span>Share Article</span>
                        </Button>

                        {showShareMenu && (
                            <div className="absolute top-full mt-2 bg-popover text-popover-foreground rounded-xl shadow-2xl p-4 z-10 min-w-[200px] border border-border">
                                <div className="space-y-2">
                                    <Button
                                        onClick={() => handleShare("facebook")}
                                        variant="ghost"
                                        className="w-full justify-start gap-3"
                                    >
                                        <Facebook size={18} className="text-blue-600" />
                                        <span className="font-medium">Facebook</span>
                                    </Button>
                                    <Button
                                        onClick={() => handleShare("twitter")}
                                        variant="ghost"
                                        className="w-full justify-start gap-3"
                                    >
                                        <Twitter size={18} className="text-sky-500" />
                                        <span className="font-medium">Twitter</span>
                                    </Button>
                                    <Button
                                        onClick={() => handleShare("linkedin")}
                                        variant="ghost"
                                        className="w-full justify-start gap-3"
                                    >
                                        <Linkedin size={18} className="text-blue-700" />
                                        <span className="font-medium">LinkedIn</span>
                                    </Button>
                                    <Button
                                        onClick={copyLink}
                                        variant="ghost"
                                        className="w-full justify-start gap-3"
                                    >
                                        <Link2 size={18} className="text-muted-foreground" />
                                        <span className="font-medium">{copied ? "Copied!" : "Copy Link"}</span>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-12">
                <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-muted">
                    <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1200px) 100vw, 1200px"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Article Content */}
                    <div className="lg:col-span-2">
                        {/* Excerpt */}
                        <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl mb-8">
                            <p className="text-lg text-foreground/90 leading-relaxed font-medium italic">
                                {blog.excerpt}
                            </p>
                        </div>

                        {/* Content */}
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:font-semibold hover:prose-a:text-primary/80
                prose-strong:text-foreground prose-strong:font-bold
                prose-ul:my-6 prose-li:my-2
                prose-img:rounded-2xl prose-img:shadow-lg
                prose-blockquote:border-l-4 prose-blockquote:border-primary 
                prose-blockquote:bg-muted prose-blockquote:py-4 prose-blockquote:px-6
                prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-code:text-foreground prose-code:font-mono prose-code:text-sm"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />

                        {/* Tags */}
                        {blog.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-border">
                                <div className="flex items-center gap-2 mb-4">
                                    <Tag size={18} className="text-muted-foreground" />
                                    <h3 className="text-lg font-bold text-foreground">Tags</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 text-sm font-semibold border-0"
                                        >
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-8">
                            {/* Author Card */}
                            <Card className="p-6 bg-card border-border border shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                        <User size={28} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground font-medium">Written by</p>
                                        <p className="text-xl font-bold text-foreground">{blog.author}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Passionate about sustainability and environmental conservation.
                                </p>
                            </Card>

                            {/* CTA Card */}
                            <Card className="p-6 bg-primary text-primary-foreground border-0 shadow-lg">
                                <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center mb-4">
                                    <Leaf size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Plant a Tree Today</h3>
                                <p className="text-primary-foreground/90 text-sm mb-4 leading-relaxed">
                                    Join our mission to make the planet greener, one tree at a time.
                                </p>
                                <Link
                                    href="/Tree/Shop"
                                    className="block w-full text-center px-6 py-3 bg-background text-foreground rounded-xl font-bold hover:bg-background/90 transition-all shadow-lg"
                                >
                                    Get Started
                                </Link>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Articles */}
            {relatedBlogs.length > 0 && (
                <div className="bg-muted/30 py-16 border-t border-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                                    Related Articles
                                </h2>
                                <p className="text-muted-foreground">Continue your reading journey</p>
                            </div>
                            <Link
                                href="/blog"
                                className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                            >
                                <span>View All</span>
                                <ChevronRight size={20} />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedBlogs.map((relatedBlog) => (
                                <RelatedBlogCard key={relatedBlog._id} blog={relatedBlog} />
                            ))}
                        </div>

                        <Link
                            href="/blog"
                            className="md:hidden flex items-center justify-center gap-2 text-primary font-bold hover:gap-3 transition-all mt-8"
                        >
                            <span>View All Articles</span>
                            <ChevronRight size={20} />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

// Related Blog Card Component
function RelatedBlogCard({ blog }: { blog: IBlog }) {
    return (
        <Link href={`/blog/${blog.slug}`}>
            <Card className="group relative flex flex-col overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 bg-card h-full hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <Badge className="w-fit bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-3 px-3 py-1 text-xs font-bold">
                        {blog.category}
                    </Badge>

                    <h3 className="text-lg font-bold text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                        {blog.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                        {blog.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t border-border">
                        <Calendar size={12} />
                        <span>{new Date(blog.publishedAt || blog.createdAt || "").toLocaleDateString()}</span>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
