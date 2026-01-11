
import React from 'react';

const AsSeenIn: React.FC = () => {
    const outlets = [
        { icon: 'eco', name: 'ECO TIMES' },
        { icon: 'public', name: 'GREEN PLANET' },
        { icon: 'newspaper', name: 'THE TRIBUNE' },
        { icon: 'foundation', name: 'EARTH FIRST' },
        { icon: 'forest', name: 'WILD MAGAZINE' },
    ];

    return (
        <section className="py-12 border-b border-sage/10">
            <div className="max-w-[1200px] mx-auto px-6">
                <p className="text-center text-sage text-xs font-bold uppercase tracking-[0.2em] mb-10">As Seen In</p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                    {outlets.map((outlet, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-3xl">{outlet.icon}</span>
                            <span className="text-xl font-bold tracking-tight whitespace-nowrap">{outlet.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AsSeenIn;
