
import React from 'react';
import Link from 'next/link';

const Stats: React.FC = () => {
  const impactStats = [
    { icon: 'forest', label: 'Trees Planted', value: '1.2M+' },
    { icon: 'co2', label: 'CO2 Offset', value: '450k Tons' },
    { icon: 'landscape', label: 'Hectares Restored', value: '12,000' },
    { icon: 'groups', label: 'Active Communities', value: '500+' },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {impactStats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2 rounded-2xl p-6 sm:p-8 bg-white dark:bg-gray-800 border border-sage/10 dark:border-gray-700 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl group"
          >
            <span className="material-symbols-outlined text-primary text-3xl sm:text-4xl group-hover:scale-110 transition-transform">{stat.icon}</span>
            <p className="text-sage dark:text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wider mt-3 sm:mt-4">{stat.label}</p>
            <p className="text-deep-forest dark:text-white text-3xl sm:text-4xl font-black leading-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-12 sm:mt-16 text-center bg-gradient-to-r from-primary/5 to-green-50 dark:from-primary/10 dark:to-gray-800 rounded-2xl p-8 sm:p-12 border border-primary/10">
        <h3 className="text-2xl sm:text-3xl font-black text-deep-forest dark:text-white mb-4">
          Ready to Make an Impact?
        </h3>
        <p className="text-sage dark:text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
          Join thousands of people worldwide who are actively restoring our planet&apos;s forests. Every tree counts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/Tree/Free_clam_tree"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-deep-forest font-bold rounded-full hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🌱 Start Planting Trees
          </Link>
          <Link
            href="/Tree/Global"
            className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-deep-forest dark:text-white font-bold rounded-full border-2 border-primary/20 hover:border-primary/40 transition-all transform hover:scale-105"
          >
            🌍 View Global Impact
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Stats;
