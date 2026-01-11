
import React from 'react';
import { ImpactStats } from './types';

interface SidebarProps {
    impact: ImpactStats;
    tags: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ impact, tags }) => {
    return (
        <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-10">

                {/* Project Impact Box */}
                <div className="rounded-2xl border border-vanagrow-border bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <span className="material-symbols-outlined">eco</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-slate-900">Project Impact</h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex items-baseline justify-between">
                                <span className="font-display text-4xl font-bold text-slate-900">{impact.hectares.toLocaleString()}</span>
                                <span className="text-sm font-medium text-vanagrow-accent">Hectares Protected</span>
                            </div>
                            <div className="mt-3 h-2.5 w-full rounded-full bg-slate-100">
                                <div className="h-full rounded-full bg-primary" style={{ width: '85%' }} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-xl bg-vanagrow-light p-4">
                                <span className="block font-display text-2xl font-bold text-slate-900">{impact.trees}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-vanagrow-accent">Trees Planted</span>
                            </div>
                            <div className="rounded-xl bg-vanagrow-light p-4">
                                <span className="block font-display text-2xl font-bold text-slate-900">{impact.jobs}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-vanagrow-accent">Local Jobs</span>
                            </div>
                        </div>

                        <button className="w-full rounded-xl bg-primary py-4 text-sm font-bold text-vanagrow-dark shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
                            Support This Project
                        </button>
                    </div>
                </div>

                {/* Newsletter Box */}
                <div className="relative overflow-hidden rounded-2xl bg-vanagrow-dark p-8 text-white shadow-xl">
                    <div className="relative z-10">
                        <h3 className="font-display text-2xl font-bold leading-tight">Join the Movement</h3>
                        <p className="mt-2 text-sm text-vanagrow-accent/80 leading-relaxed">
                            Weekly insights on reforestation and climate tech delivered to your inbox.
                        </p>
                        <div className="mt-6 space-y-3">
                            <input
                                type="email"
                                placeholder="email@vanagrow.com"
                                className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 px-4 text-sm text-white placeholder:text-slate-500 focus:ring-primary focus:border-primary"
                            />
                            <button className="w-full rounded-xl bg-white py-3.5 text-sm font-bold text-vanagrow-dark transition-colors hover:bg-slate-100">
                                Subscribe
                            </button>
                        </div>
                    </div>
                    <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-[140px] text-white/5 rotate-12 select-none">
                        forest
                    </span>
                </div>

                {/* Topic Tags */}
                <div>
                    <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-vanagrow-accent">Topic Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <a
                                key={tag}
                                href="#"
                                className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-primary/20 hover:text-vanagrow-dark"
                            >
                                {tag}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </aside>
    );
};

export default Sidebar;
