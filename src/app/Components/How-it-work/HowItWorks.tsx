
import React from 'react';

const steps = [
  {
    icon: 'search',
    title: '1. Browse',
    description: 'Find your favorite products or eco-friendly alternatives through our curated directory.'
  },
  {
    icon: 'shopping_cart',
    title: '2. Click to Shop',
    description: 'Use our secure links to visit Amazon or other major retailers to start your shopping session.'
  },
  {
    icon: 'check_circle',
    title: '3. Complete Purchase',
    description: 'Shop as you normally would. The retailer pays us a small commission for referring you.'
  },
  {
    icon: 'park',
    title: '4. We Plant Trees',
    description: 'We use 100% of the profits from your commission to plant native trees in high-impact areas.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-white border-y border-sage/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="step-connector flex flex-col items-center text-center group">
              <div className="size-20 rounded-3xl bg-background-light border border-sage/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-deep-forest transition-all duration-300">
                <span className="material-symbols-outlined text-4xl">{step.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-sage text-sm leading-relaxed max-w-[200px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
