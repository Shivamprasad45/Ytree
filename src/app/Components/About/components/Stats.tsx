
import React from 'react';

const stats = [
  { label: 'Trees Planted', value: '1.2M+' },
  { label: 'Hectares Restored', value: '45k' },
  { label: 'Species Protected', value: '850' },
  { label: 'Active Members', value: '120k' },
];

const Stats: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-background-dark border-b border-[#dce5dc] dark:border-[#2a3a2a]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-black text-primary">{stat.value}</span>
              <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#648764]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
