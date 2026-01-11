
import React from 'react';

const Certifications: React.FC = () => {
  const certs = ["B-Corp Certified", "Carbon Neutral", "1% For The Planet", "EcoVadis Gold"];

  return (
    <section className="py-6 overflow-hidden bg-white/50">
      <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {certs.map((cert, idx) => (
          <span key={idx} className="text-sm font-bold tracking-widest uppercase text-center px-4">
            {cert}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
