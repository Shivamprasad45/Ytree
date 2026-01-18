
import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-primary">
      <div className="max-w-[960px] mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to make an impact?</h2>
        <p className="text-lg opacity-90 mb-10 max-w-2xl mx-auto">Start shopping with VanaGrow and turn your everyday purchases into a thriving forest. It’s free to join and makes a world of difference.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white text-[#111711] px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-100 transition-colors active:scale-95">
            Start Shopping Now
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors active:scale-95">
            View Our Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
