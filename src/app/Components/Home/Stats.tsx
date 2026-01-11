
import React from 'react';

const Stats: React.FC = () => {
  const impactStats = [
    { icon: 'forest', label: 'Trees Planted', value: '1.2M+' },
    { icon: 'co2', label: 'CO2 Offset', value: '450k Tons' },
    { icon: 'landscape', label: 'Hectares Restored', value: '12,000' },
    { icon: 'groups', label: 'Active Communities', value: '500+' },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {impactStats.map((stat, idx) => (
          <div 
            key={idx} 
            className="flex flex-col gap-2 rounded-2xl p-8 bg-white border border-sage/10 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl group"
          >
            <span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform">{stat.icon}</span>
            <p className="text-sage text-sm font-bold uppercase tracking-wider mt-4">{stat.label}</p>
            <p className="text-deep-forest text-4xl font-black leading-tight">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
