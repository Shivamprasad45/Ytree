
"use client";

import React, { useState, useMemo } from 'react';

import BlogCard from '../Components/Blog/BlogCard';
import { IBlog } from '../../type';

// import { BlogCategory, BlogPost } from './types'; // Removed as we use IBlog

interface BlogListClientProps {
    initialBlogs: IBlog[];
    categories: string[];
    tags: string[];
}

const BlogListClient: React.FC<BlogListClientProps> = ({ initialBlogs, categories, tags }) => {
    const [activeCategory, setActiveCategory] = useState<string>('All Posts');

    // Ensure "All Posts" is in the categories list if not present or handle logic
    // Ensure "All Posts" is in the categories list if not present or handle logic
    const displayCategories = useMemo(() => {
        const uniqueCategories = new Set(['All Posts', ...categories]);
        return Array.from(uniqueCategories);
    }, [categories]);

    // Filter posts based on active category first
    const displayPosts = useMemo(() => {
        if (activeCategory === 'All Posts') return initialBlogs;
        return initialBlogs.filter(post => post.category === activeCategory);
    }, [activeCategory, initialBlogs]);

    // Then determine featured and regular posts from the filtered list
    const featuredPost = useMemo(() => displayPosts.length > 0 ? displayPosts[0] : null, [displayPosts]);
    const filteredPosts = useMemo(() => displayPosts.length > 0 ? displayPosts.slice(1) : [], [displayPosts]);


    return (
        <div className="min-h-screen">


            <main>
                {/* Header Section */}
                <section className="max-w-[1280px] mx-auto px-6 pt-10 pb-16">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-black mb-4">Sustainability Blog</h1>
                        <p className="text-sage text-lg max-w-2xl">
                            Latest updates on our reforestation efforts, eco-tips for a greener lifestyle, and stories from our global partners.
                        </p>
                    </div>

                    {/* Hero / Featured Post */}
                    {featuredPost && (
                        <div className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] bg-deep-forest aspect-[21/9] flex items-end">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage: `linear-gradient(to top, rgba(17, 24, 17, 0.9), transparent), url('${featuredPost.featuredImage}')`
                                }}
                            ></div>
                            <div className="relative z-10 p-8 md:p-16 max-w-3xl">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-deep-forest text-xs font-bold uppercase tracking-widest mb-6">Featured Post</span>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-white/80 text-lg mb-8 line-clamp-2">{featuredPost.excerpt}</p>
                                <div className="flex items-center gap-6 text-white/60 text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
                                        {new Date(featuredPost.publishedAt || featuredPost.createdAt || "").toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                                        {featuredPost.readTime ? `${featuredPost.readTime} min read` : '5 min read'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Filters Section */}
                <section className="max-w-[1280px] mx-auto px-6 mb-12">
                    <div className="flex flex-wrap items-center gap-3 border-b border-sage/10 pb-8">
                        {displayCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                                    ? 'bg-deep-forest text-white'
                                    : 'bg-white border border-sage/20 text-sage hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Grid Section */}
                <section className="max-w-[1280px] mx-auto px-6 pb-24">
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredPosts.map((post) => (
                                <BlogCard key={post._id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-sage/20">
                            <span className="material-symbols-outlined text-6xl text-sage/30 mb-4 block">post_add</span>
                            <p className="text-sage text-lg font-medium">No additional posts to display.</p>
                            <p className="text-sage/60 text-sm mt-2">More updates coming soon!</p>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="mt-20 flex justify-center items-center gap-4">
                        <button className="size-12 rounded-full border border-sage/20 flex items-center justify-center hover:bg-primary transition-colors">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className="size-12 rounded-full bg-deep-forest text-white flex items-center justify-center font-bold shadow-lg">1</button>
                        <button className="size-12 rounded-full border border-sage/20 flex items-center justify-center font-bold hover:border-primary">2</button>
                        <button className="size-12 rounded-full border border-sage/20 flex items-center justify-center font-bold hover:border-primary">3</button>
                        <button className="size-12 rounded-full border border-sage/20 flex items-center justify-center hover:bg-primary transition-colors">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="max-w-[1280px] mx-auto px-6 pb-24">
                    <div className="bg-deep-forest rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 size-64 bg-primary/20 blur-[100px]"></div>
                        <div className="absolute bottom-0 left-0 size-64 bg-sage/20 blur-[100px]"></div>
                        <div className="relative z-10">
                            <h2 className="text-white text-3xl md:text-5xl font-black mb-8 leading-tight">
                                Get the latest eco-insights <br />
                                <span className="text-primary italic">delivered to your inbox.</span>
                            </h2>
                            <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto font-medium">
                                Join 50,000+ subscribers who receive our monthly sustainability digest.
                            </p>
                            <form
                                className="flex flex-col sm:flex-row justify-center gap-4"
                                onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }}
                            >
                                <input
                                    className="h-14 px-8 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-w-[300px]"
                                    placeholder="Enter your email"
                                    type="email"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="h-14 px-10 rounded-full bg-primary text-deep-forest font-bold text-lg hover:scale-105 transition-transform"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default BlogListClient;
