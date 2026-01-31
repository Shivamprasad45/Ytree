
import React from 'react';
import MaxWidthRappers from '@/components/MaxWidthRapper';

const ProblemSolution: React.FC = () => {
  return (
    <section className="py-24 bg-background">
      <MaxWidthRappers>
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">The Challenge vs. The Solution</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">We believe that the power of daily choices can outweigh the speed of environmental degradation.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* The Problem */}
          <div className="group p-8 rounded-xl bg-card border border-border hover:border-red-200 transition-all">
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center text-red-600 mb-6">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">The Climate Crisis</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every minute, we lose forest area equivalent to 27 soccer fields. This rapid deforestation accounts for 15% of global greenhouse gas emissions, pushing biodiversity to the brink of extinction.
            </p>
          </div>
          {/* The Solution */}
          <div className="group p-8 rounded-xl bg-primary/10 border-2 border-primary transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white mb-6">
              <span className="material-symbols-outlined">eco</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">The VanaGrow Model</h3>
            <p className="text-foreground leading-relaxed font-medium">
              Our affiliate model redirects commerce towards reforestation. For every transaction made through our partner network, 80% of commissions go directly to planting trees and restoring local ecosystems.
            </p>
          </div>
        </div>
      </MaxWidthRappers>
    </section>
  );
};

export default ProblemSolution;
