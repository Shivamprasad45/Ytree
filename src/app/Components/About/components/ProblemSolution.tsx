
import React from 'react';

const ProblemSolution: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-background-light dark:bg-background-dark/50">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#111711] dark:text-white mb-6">The Challenge vs. The Solution</h2>
          <p className="text-[#648764] text-lg max-w-2xl">We believe that the power of daily choices can outweigh the speed of environmental degradation.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* The Problem */}
          <div className="group p-8 rounded-xl bg-white dark:bg-[#1a2e1a] border border-[#dce5dc] dark:border-[#2a3a2a] hover:border-red-200 transition-all">
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center text-red-600 mb-6">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">The Climate Crisis</h3>
            <p className="text-[#648764] dark:text-[#a0c0a0] leading-relaxed">
              Every minute, we lose forest area equivalent to 27 soccer fields. This rapid deforestation accounts for 15% of global greenhouse gas emissions, pushing biodiversity to the brink of extinction.
            </p>
          </div>
          {/* The Solution */}
          <div className="group p-8 rounded-xl bg-primary/10 dark:bg-primary/20 border-2 border-primary transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white mb-6">
              <span className="material-symbols-outlined">eco</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#111711] dark:text-white">The VanaGrow Model</h3>
            <p className="text-[#111711] dark:text-white leading-relaxed font-medium">
              Our affiliate model redirects commerce towards reforestation. For every transaction made through our partner network, 80% of commissions go directly to planting trees and restoring local ecosystems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
