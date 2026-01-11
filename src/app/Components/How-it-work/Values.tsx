
import React from 'react';

const values = [
    { icon: 'eco', label: 'Sustainability First' },
    { icon: 'public', label: 'Global Impact' },
    { icon: 'shield_with_heart', label: 'Ethical Shopping' },
    { icon: 'water_drop', label: 'Clean Ecosystems' }
];

const Values: React.FC = () => {
    return (
        <section className="py-12 bg-background-light">
            <div className="max-w-[1200px] mx-auto px-6 text-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
                    {values.map((v, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-4xl">{v.icon}</span>
                            <span className="text-xs font-bold uppercase tracking-widest">{v.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Values;
