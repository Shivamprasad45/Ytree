
import React from 'react';

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col gap-4 rounded-xl border border-[#dbe6db] dark:border-[#2a3a2a] bg-white dark:bg-[#1a2e1a] p-8 hover:border-primary transition-all group">
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
      <span className="material-symbols-outlined text-3xl">{icon}</span>
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="text-[#111811] dark:text-white text-xl font-bold">{title}</h3>
      <p className="text-[#618961] dark:text-[#a0c0a0] text-base leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const Benefits: React.FC = () => {
  return (
    <section className="px-6 md:px-10 py-16" id="benefits">
      <div className="flex flex-col md:flex-row gap-12 items-end mb-12">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-[#111811] dark:text-white tracking-tight text-3xl md:text-5xl font-black leading-tight">
            Why Partner with VanaGrow?
          </h2>
          <p className="text-[#618961] dark:text-[#a0c0a0] text-lg max-w-[600px]">
            Unlock measurable environmental and social value for your organization through verified reforestation.
          </p>
        </div>
        <div className="hidden md:block">
          <span className="material-symbols-outlined text-primary text-6xl opacity-20">nature_people</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BenefitCard 
          icon="verified_user"
          title="ESG Compliance"
          description="Full transparency and certification for your annual sustainability reports. Every tree is GPS tagged."
        />
        <BenefitCard 
          icon="diversity_3"
          title="Employee Engagement"
          description="Transformative team-building experiences with organized on-ground planting days for your staff."
        />
        <BenefitCard 
          icon="query_stats"
          title="Impact Reporting"
          description="Real-time digital dashboards to track your growing corporate forest and carbon sequestration metrics."
        />
      </div>
    </section>
  );
};

export default Benefits;
