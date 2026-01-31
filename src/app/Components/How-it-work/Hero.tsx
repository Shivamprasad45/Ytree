"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import MaxWidthRappers from "@/components/MaxWidthRapper";

const Hero: React.FC = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="relative pt-24 pb-16 overflow-hidden bg-muted/30">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent_70%)]" />
            <MaxWidthRappers>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-6 max-w-3xl mx-auto relative z-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                        <Leaf className="w-3.5 h-3.5" />
                        Transparent Reforestation
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
                        How <span className="text-primary">Vanagrow</span> Works
                    </h1>
                    <p className="text-lg text-muted-foreground font-medium">
                        A unified platform connecting individuals and businesses with verified NGOs to restore our planet, one tree at a time.
                    </p>
                </motion.div>
            </MaxWidthRappers>
        </section>
    );
};

export default Hero;
