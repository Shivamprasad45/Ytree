
import React from 'react';

const Partners: React.FC = () => {
  const partners = ["EcoCorp", "GreenTech", "TerraSoft", "BioLogic", "NaturePact"];
  
  return (
    <section className="px-6 md:px-10 py-12 border-t border-b border-[#dbe6db] dark:border-[#2a3a2a] my-10 bg-white/50 dark:bg-black/10">
      <p className="text-center text-[#618961] dark:text-[#a0c0a0] text-xs font-bold uppercase tracking-[0.2em] mb-8">
        Trusted by Global Leaders
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all">
        {partners.map(p => (
          <div key={p} className="flex items-center gap-2 font-black text-xl text-[#111811] dark:text-white">
            {p}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
