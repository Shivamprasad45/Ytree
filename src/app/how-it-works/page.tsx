"use client";

import Hero from "@/app/Components/How-it-work/Hero";
import HowItWorks from "@/app/Components/How-it-work/HowItWorks";
import Transparency from "@/app/Components/How-it-work/Transparency";

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-background">
            <Hero />
            <HowItWorks />
            <Transparency />
        </div>
    );
}
