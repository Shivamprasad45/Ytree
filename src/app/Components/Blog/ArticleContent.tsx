import React from 'react';
import { Author } from './types';
import { IBlog, ISection, ISubsection } from '@/type';
import GoogleAds from '../Home/GoogleAds';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleContentProps {
    author: Author;
    blog: IBlog;
}

const SubsectionCard: React.FC<{ subsection: ISubsection }> = ({ subsection }) => {
    return (
        <div className="mt-8 pl-6 border-l-2 border-vanagrow-border/50">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">{subsection.title}</h3>
            {subsection.imageUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-6">
                    <Image
                        src={subsection.imageUrl}
                        alt={subsection.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            {subsection.youtubeUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-6">
                    <iframe
                        src={subsection.youtubeUrl.replace("watch?v=", "embed/")}
                        title={subsection.title}
                        className="absolute inset-0 h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
            <div
                className="text-slate-700 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: subsection.content }}
            />
        </div>
    );
};

const SectionCard: React.FC<{ section: ISection; index: number }> = ({ section, index }) => {
    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">{section.title}</h2>

            {section.imageUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-8">
                    <Image
                        src={section.imageUrl}
                        alt={section.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            {section.youtubeUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-8 shadow-lg">
                    <iframe
                        src={section.youtubeUrl.replace("watch?v=", "embed/")}
                        title={section.title}
                        className="absolute inset-0 h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            <div
                className="text-slate-700 text-xl leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.content }}
            />

            {section.subsections && section.subsections.length > 0 && (
                <div className="mt-8 space-y-10">
                    {section.subsections
                        .sort((a: ISubsection, b: ISubsection) => a.order - b.order)
                        .map((sub: ISubsection) => (
                            <SubsectionCard key={sub.id} subsection={sub} />
                        ))}
                </div>
            )}

            {/* Injected Ad after the first section if there are many */}
            {index === 0 && <GoogleAds />}
        </div>
    );
};

const ArticleContent: React.FC<ArticleContentProps> = ({ author, blog }) => {
    return (
        <article className="lg:col-span-8">
            {/* Author Header */}
            <div className="mb-10 flex items-center gap-4 border-b border-vanagrow-border pb-8">
                <img
                    src={author.image}
                    alt={author.name}
                    className="h-14 w-14 rounded-full border border-vanagrow-border object-cover shadow-sm"
                />
                <div className="flex flex-col">
                    <span className="font-display text-lg font-bold text-slate-900">{author.name}</span>
                    <span className="text-sm text-vanagrow-accent">{author.role} | {author.date}</span>
                </div>
                <div className="ml-auto">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-vanagrow-border transition-colors hover:bg-primary/10">
                        <span className="material-symbols-outlined text-xl">share</span>
                    </button>
                </div>
            </div>

            {/* Subtitle if available */}
            {blog.subtitle && (
                <p className="mb-8 text-2xl font-medium text-slate-600 italic leading-relaxed">
                    {blog.subtitle}
                </p>
            )}

            {/* Featured Video if available */}
            {blog.featuredVideo && (
                <div className="mb-10 relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl">
                    <iframe
                        src={blog.featuredVideo.replace("watch?v=", "embed/")}
                        title={blog.title}
                        className="absolute inset-0 h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            {/* Main Content (Rich Text) */}
            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-p:font-display prose-p:text-xl prose-p:leading-relaxed prose-p:text-slate-700">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />

                {blog.sections && blog.sections.length > 0 && (
                    <div className="mt-12 space-y-16">
                        {blog.sections
                            .sort((a: ISection, b: ISection) => a.order - b.order)
                            .map((section: ISection, index: number) => (
                                <SectionCard key={section.id} section={section} index={index} />
                            ))}
                    </div>
                )}
            </div>

            {/* Ad at the bottom of content */}
            {(!blog.sections || blog.sections.length === 0) && <GoogleAds />}

            {/* Share Actions */}
            <div className="mt-16 flex flex-col gap-4 border-y border-vanagrow-border py-10">
                <span className="font-display text-lg font-bold text-slate-900">Share this milestone</span>
                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert("Link copied to clipboard!");
                        }}
                        className="flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-black"
                    >
                        <span className="material-symbols-outlined text-sm">link</span>
                        Copy Link
                    </button>
                    <button className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1DA1F2] text-white transition-opacity hover:opacity-90">
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>
                    </button>
                    <button className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0077b5] text-white transition-opacity hover:opacity-90">
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                    </button>
                </div>
            </div>

            {/* About Author Card */}
            <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    <img
                        src={author.image}
                        alt={author.name}
                        className="h-24 w-24 flex-shrink-0 rounded-full border-2 border-primary object-cover shadow-lg"
                    />
                    <div>
                        <span className="font-display text-xl font-bold text-slate-900">About the Author</span>
                        <p className="mt-1 font-semibold text-slate-900">{author.name}</p>
                        <p className="mt-2 text-slate-600 leading-relaxed">{author.bio}</p>
                        <Link href="/blog" className="mt-4 inline-flex items-center gap-1 font-bold text-primary transition-colors hover:underline">
                            View all posts <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ArticleContent;
