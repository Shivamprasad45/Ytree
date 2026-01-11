
import React from 'react';

import Link from 'next/link';

const Hero: React.FC = () => {
    return (
        <section className="relative px-6 py-16 md:py-24 overflow-hidden">
            {/* Abstract Background Blur */}
            <div className="absolute top-20 right-[-10%] w-96 h-96 bg-primary/5 blur-[120px] -z-10 rounded-full"></div>

            <div className="max-w-[1000px] mx-auto text-center relative">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider mb-6">
                    REFORESTATION MADE SIMPLE
                </span>
                <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-deep-forest mb-8">
                    How It Works – Shop & <br /><span className="text-sage">Help Plant Trees 🌱</span>
                </h1>
                <p className="text-lg md:text-xl text-sage max-w-2xl mx-auto leading-relaxed">
                    We&apos;ve partnered with major retailers to turn your everyday purchases into a force for nature. It costs you nothing extra, but means the world to our planet.
                </p>
                <div className="mt-12">
                    <Link href="/affiliate-shop" className="px-10 py-4 bg-primary text-deep-forest rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all shadow-xl shadow-primary/30 inline-block">
                        Start Shopping Now
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
