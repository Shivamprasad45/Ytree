
import React from 'react';
import MaxWidthRappers from '@/components/MaxWidthRapper';

const stats = [
  { label: 'Trees Planted', value: '1.2M+' },
  { label: 'Hectares Restored', value: '45k' },
  { label: 'Species Protected', value: '850' },
  { label: 'Active Members', value: '120k' },
];

const Stats: React.FC = () => {
  return (
    <section className="py-12 bg-card border-b border-border">
      <MaxWidthRappers>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-black text-primary">{stat.value}</span>
              <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </MaxWidthRappers>
    </section>
  );
};

export default Stats;
