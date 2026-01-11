"use client";

import React from 'react';



import Hero from '../Components/How-it-work/Hero';
import HowItWorks from '../Components/How-it-work/HowItWorks';
import Transparency from '../Components/How-it-work/Transparency';
import Values from '../Components/How-it-work/Values';
import FooterCTA from '../Components/How-it-work/FooterCTA';

export default function HowItWorksPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50 }
        }
    };

    return (

        <div className="flex flex-col min-h-screen">

            <main className="flex-grow">
                <Hero />
                <HowItWorks />
                <Transparency />
                <FooterCTA />
                <Values />


                {/* Affiliate Disclaimer */}
                <section className="py-12 border-t border-sage/10 bg-white/30">
                    <div className="max-w-[800px] mx-auto px-6 text-center">
                        <p className="text-sage text-xs leading-relaxed italic">
                            As an Amazon Associate, Vanagrow earns from qualifying purchases. This means when you click on links to various merchants on this site and make a purchase, this can result in this site earning a commission. Affiliate programs and affiliations include, but are not limited to, the Amazon Associates Program.
                        </p>
                    </div>
                </section>
            </main>

        </div>
    );
}
