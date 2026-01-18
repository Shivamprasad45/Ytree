
import React from 'react';

interface TierProps {
  name: string;
  range: string;
  buttonText: string;
  features: string[];
  isPopular?: boolean;
}

const TierCard: React.FC<TierProps> = ({ name, range, buttonText, features, isPopular }) => (
  <div className={`flex flex-col gap-6 rounded-xl p-8 bg-white dark:bg-[#102210] ${isPopular ? 'relative border-2 border-primary shadow-xl transform md:-translate-y-4' : 'border border-[#dbe6db] dark:border-[#2a3a2a]'}`}>
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
        Most Popular Impact
      </div>
    )}
    <div className="flex flex-col gap-2">
      <h3 className="text-[#111811] dark:text-white text-lg font-bold">{name}</h3>
      <div className="flex items-baseline gap-1 text-[#111811] dark:text-white">
        <span className="text-4xl font-black tracking-tight">{range}</span>
        <span className="text-sm font-semibold opacity-70">trees/year</span>
      </div>
    </div>
    <button className={`w-full py-3 rounded-lg text-sm font-bold transition-all ${isPopular ? 'bg-primary text-white hover:bg-primary/90' : 'bg-[#f0f4f0] dark:bg-white/5 text-[#111811] dark:text-white hover:bg-primary/20'}`}>
      {buttonText}
    </button>
    <div className="flex flex-col gap-4 mt-2">
      {features.map((f, i) => (
        <div key={i} className="flex items-center gap-3 text-sm text-[#111811] dark:text-white/80">
          <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
          {f}
        </div>
      ))}
    </div>
  </div>
);

const Tiers: React.FC = () => {
  return (
    <section className="px-6 md:px-10 py-16 bg-white dark:bg-[#1a2e1a] rounded-3xl mx-6 mb-16 shadow-sm border border-[#dbe6db] dark:border-[#2a3a2a]" id="tiers">
      <div className="text-center mb-12">
        <h2 className="text-[#111811] dark:text-white text-3xl md:text-4xl font-black mb-4">Choose Your Impact Level</h2>
        <p className="text-[#618961] dark:text-[#a0c0a0] max-w-2xl mx-auto">Select a partnership tier that aligns with your corporate sustainability goals.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <TierCard 
          name="Seed Tier"
          range="100-500"
          buttonText="Select Seed Impact"
          features={["Digital Certificates", "Basic Quarterly Reporting", "Community Support"]}
        />
        <TierCard 
          name="Grove Tier"
          range="500-2,000"
          buttonText="Select Grove Impact"
          isPopular
          features={["All Seed Benefits", "On-site Planting Day Invite", "Custom Digital Dashboard", "ESG Data Export"]}
        />
        <TierCard 
          name="Forest Tier"
          range="2,000+"
          buttonText="Contact Sales for Forest"
          features={["Dedicated Impact Manager", "PR & Marketing Package", "Custom Branded Micro-site"]}
        />
      </div>
    </section>
  );
};

export default Tiers;
