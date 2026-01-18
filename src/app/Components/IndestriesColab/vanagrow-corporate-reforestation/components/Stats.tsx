
import React from 'react';

const StatCard: React.FC<{ label: string; value: string; icon: string }> = ({ label, value, icon }) => (
  <div className="flex flex-col gap-2 rounded-xl p-8 border border-[#dbe6db] dark:border-[#2a3a2a] bg-white dark:bg-[#1a2e1a] shadow-sm">
    <p className="text-[#618961] dark:text-[#a0c0a0] text-sm font-semibold uppercase tracking-wider">{label}</p>
    <div className="flex items-baseline gap-2">
      <p className="text-[#111811] dark:text-white tracking-tight text-4xl font-black leading-tight">{value}</p>
      <span className="text-primary material-symbols-outlined">{icon}</span>
    </div>
  </div>
);

const Stats: React.FC = () => {
  return (
    <section className="px-6 md:px-10 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Trees Planted" value="1.2M+" icon="trending_up" />
        <StatCard label="Corporate Partners" value="250+" icon="groups" />
        <StatCard label="Hectares Restored" value="4,500+" icon="landscape" />
      </div>
    </section>
  );
};

export default Stats;
