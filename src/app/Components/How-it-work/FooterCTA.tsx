
import React from 'react';

const FooterCTA: React.FC = () => {
    return (
        <section className="max-w-[1200px] mx-auto px-6 py-24">
            <div className="bg-deep-forest rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                {/* Glow Effects */}
                <div className="absolute top-0 right-0 size-64 bg-primary/20 blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 size-64 bg-sage/20 blur-[100px]"></div>

                <div className="relative z-10">
                    <h2 className="text-white text-4xl md:text-5xl font-black mb-8 leading-tight">
                        Your everyday items, <br />
                        <span className="text-primary italic">planting trees for tomorrow.</span>
                    </h2>
                    <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
                        Ready to start your journey? No account needed, just start shopping through Vanagrow.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <button className="h-16 px-12 rounded-full bg-primary text-deep-forest font-bold text-xl hover:scale-105 transition-transform shadow-xl shadow-primary/20">
                            Start Shopping Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FooterCTA;
