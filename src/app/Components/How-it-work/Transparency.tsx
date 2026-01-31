"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";
import MaxWidthRappers from "@/components/MaxWidthRapper";

const Transparency: React.FC = () => {
    return (
        <section className="py-20 bg-muted/30 border-t border-border">
            <MaxWidthRappers>
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <Badge variant="outline" className="mb-4 bg-card text-foreground border-border uppercase tracking-widest font-black py-1 px-3">
                        Transparency First
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">The Cycle of Trust</h2>
                    <p className="text-muted-foreground font-medium text-lg">
                        We ensure that every donation results in a living tree through our rigorous 3-step verification process.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-border -z-0" />

                    {[
                        { step: "1", title: "Assignment", desc: "User selects NGO & pays. Funds are held in escrow.", color: "bg-blue-600" },
                        { step: "2", title: "Plantation", desc: "NGO executes planting and updates status with proofs.", color: "bg-primary" },
                        { step: "3", title: "Verification", desc: "Third-party audit confirms impact. Funds released.", color: "bg-purple-600" },
                    ].map((item, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-4">
                            <div className={`w-24 h-24 rounded-3xl ${item.color} text-white flex items-center justify-center shadow-xl shadow-muted`}>
                                <span className="text-4xl font-black">{item.step}</span>
                            </div>
                            <h3 className="text-xl font-black text-foreground">{item.title}</h3>
                            <p className="text-muted-foreground font-medium max-w-xs">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </MaxWidthRappers>
        </section>
    );
};

export default Transparency;
