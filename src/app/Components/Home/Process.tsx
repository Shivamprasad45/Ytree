
import React from 'react';

const Process: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Shop Sustainably',
      description: 'Choose from our curated range of eco-friendly products that prioritize both quality and planetary health.',
      icon: 'shopping_bag'
    },
    {
      id: 2,
      title: 'We Plant',
      description: 'For every purchase made, we fund the planting of a native tree species in a high-impact restoration site.',
      icon: 'potted_plant'
    },
    {
      id: 3,
      title: 'Track Progress',
      description: 'Follow the growth of your forest in real-time. Get GPS coordinates and photos of the actual planting sites.',
      icon: 'insights'
    },
  ];

  return (
    <section className="bg-background-light dark:bg-background py-24 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-deep-forest dark:text-foreground text-4xl md:text-5xl font-black leading-tight mb-4">
              Regenerating the planet is simpler than you think.
            </h2>
            <p className="text-sage dark:text-muted-foreground text-lg font-medium">Making a tangible difference is woven into every interaction with Vanagrow.</p>
          </div>
          <a className="text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform group" href="#">
            Learn more about our mission
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group flex flex-col gap-6 rounded-3xl bg-white dark:bg-card p-10 shadow-sm border border-transparent hover:border-primary/20 hover:shadow-xl transition-all"
            >
              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-deep-forest transition-all">
                <span className="material-symbols-outlined text-3xl">{step.icon}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-deep-forest dark:text-foreground text-2xl font-bold">{step.id}. {step.title}</h3>
                <p className="text-sage dark:text-muted-foreground text-base leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
