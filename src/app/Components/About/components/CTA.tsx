
import React from 'react';
import MaxWidthRappers from '@/components/MaxWidthRapper';

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-primary">
      <MaxWidthRappers>
        <div className="max-w-[960px] mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to make an impact?</h2>
          <p className="text-lg opacity-90 mb-10 max-w-2xl mx-auto">Start shopping with VanaGrow and turn your everyday purchases into a thriving forest. It’s free to join and makes a world of difference.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-background text-foreground px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-muted transition-colors active:scale-95">
              Start Shopping Now
            </button>
            <button className="bg-transparent border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-foreground/10 transition-colors active:scale-95">
              View Our Projects
            </button>
          </div>
        </div>
      </MaxWidthRappers>
    </section>
  );
};

export default CTA;
