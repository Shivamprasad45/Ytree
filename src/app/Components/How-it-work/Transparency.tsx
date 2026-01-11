
import React from 'react';

const features = [
    {
        icon: 'payments',
        title: 'Zero Extra Cost to You',
        description: 'Product prices remain exactly the same. Retailers share a portion of their profit as a "thank you" to us.'
    },
    {
        icon: 'verified',
        title: 'Verified NGO Partners',
        description: 'We partner with organizations like Eden Reforestation Projects and One Tree Planted to ensure real impact.'
    },
    {
        icon: 'map',
        title: 'Real-Time Impact Map',
        description: 'Access GPS coordinates and photos of the actual planting sites where your shopping contributed.'
    }
];

const Transparency: React.FC = () => {
    return (
        <section className="py-24 px-6 overflow-hidden">
            <div className="max-w-[1200px] mx-auto">
                <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-sage/10 shadow-sm relative">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    alt="Verified reforestation site"
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEUHMdpf_n7-0yZcg_L3O-R91ULB6-vqpRl-Snln9d-97eS_A-qTfmaIuIBUZ3q_hXT2KDMlMc7mhy4t9VimuVM7NadTUxwpLnbSLYodb5Ys3LmFrWq-n9qxkF6L-gkO4bfLpew7PiCvCtQtD9BVLHchc9ABP60AuFSsH0r32qo_6suxTRDKOiBmuGosM2zbrCE4lxYZtW5N8QgZArQxewyL-hmHvhuNJZ34NLuOgExSJNy79ve95-GBZgfKZn3dwmy_373msq2qR1"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-primary p-6 rounded-2xl shadow-xl hidden lg:block">
                                <p className="text-deep-forest font-black text-2xl">100%</p>
                                <p className="text-deep-forest/80 text-xs font-bold uppercase tracking-widest leading-none">Verified</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-4xl font-black mb-6">Transparency & Trust</h2>
                            <p className="text-sage text-lg mb-8 leading-relaxed">
                                We believe in radical transparency. Every tree we plant is tracked, GPS-tagged, and verified by third-party NGOs.
                            </p>

                            <ul className="space-y-6">
                                {features.map((feature, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <div className="size-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-xl">{feature.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{feature.title}</h4>
                                            <p className="text-sage text-sm">{feature.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Transparency;
