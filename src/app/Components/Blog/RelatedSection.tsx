
import React from 'react';
import { RelatedArticle } from './types';

interface RelatedSectionProps {
    articles: RelatedArticle[];
}

const RelatedSection: React.FC<RelatedSectionProps> = ({ articles }) => {
    return (
        <section className="mt-24 border-t border-vanagrow-border pt-16">
            <div className="mb-10 flex items-end justify-between">
                <div>
                    <h2 className="font-display text-4xl font-bold text-slate-900">Keep Reading</h2>
                    <p className="mt-1 text-vanagrow-accent">Related articles from our sustainability experts</p>
                </div>
                <a href="#" className="hidden items-center gap-1 font-bold text-primary transition-colors hover:underline sm:flex">
                    View all stories <span className="material-symbols-outlined">chevron_right</span>
                </a>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                {articles.map((article) => (
                    <div key={article.id} className="group cursor-pointer">
                        <div className="relative mb-5 overflow-hidden rounded-2xl shadow-sm transition-shadow group-hover:shadow-md">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">{article.category}</span>
                        <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-primary">
                            {article.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
                            {article.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RelatedSection;
