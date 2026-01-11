
import React from 'react';
import { Author } from './types';

interface ArticleContentProps {
    author: Author;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ author }) => {
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

            {/* Body Text */}
            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-p:font-display prose-p:text-xl prose-p:leading-relaxed prose-p:text-slate-700">
                The Amazon basin, often called the lungs of the Earth, is undergoing a transformation that goes beyond mere recovery. For the past twelve months, Vanagrow has partnered with local indigenous communities to pioneer a regenerative reforestation model that doesn&apos;t just plant trees, but restores entire ecosystems.

                <h2 className="mt-12 text-3xl text-slate-900">Beyond Reforestation: Regeneration</h2>
                <p>
                    Unlike traditional monoculture planting, our &quot;Biodiverse Nucleus&quot; method involves planting 40 different native species simultaneously. This mimics the natural succession of the jungle, allowing the forest to become self-sustaining in record time. In the Xingu region alone, we&apos;ve successfully established 5,400 hectares of protected buffer zones.
                </p>

                <blockquote className="my-12 rounded-r-xl border-l-4 border-primary bg-primary/5 py-8 pl-10 pr-6 italic text-vanagrow-dark not-italic">
                    <span className="text-2xl font-medium leading-snug">
                        &quot;The goal isn&apos;t just to replace what was lost, but to create a thriving corridor for species like the Jaguar and the Harpy Eagle to return to their ancestral homes.&quot;
                    </span>
                </blockquote>

                Community involvement remains the bedrock of this success. By employing 400 local residents as &quot;Guardian Seeders,&quot; we&apos;ve ensured that the economic benefits of restoration directly support those who protect the land. This year, seed collection programs have generated over $250k in local revenue, proving that conservation is a viable economic path.

                <h2 className="mt-12 text-3xl text-slate-900">Tracking Our Progress</h2>
                <p>
                    Through advanced satellite monitoring and ground-level bio-acoustic sensors, we track more than just tree height. We track bird songs, insect diversity, and soil carbon sequestration rates. The results are clear: the Amazon is breathing again.
                </p>
            </div>

            {/* Share Actions */}
            <div className="mt-16 flex flex-col gap-4 border-y border-vanagrow-border py-10">
                <span className="font-display text-lg font-bold text-slate-900">Share this milestone</span>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-black">
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
                        <a href="#" className="mt-4 inline-flex items-center gap-1 font-bold text-primary transition-colors hover:underline">
                            View all posts <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ArticleContent;
