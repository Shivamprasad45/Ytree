
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="mb-12">
      <div 
        className="relative overflow-hidden rounded-xl bg-[#112111] text-white p-8 md:p-16 flex flex-col items-center text-center gap-6"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-2xl flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Shop Sustainably. <br/><span className="text-[#1dc91d]">Plant Trees Automatically.</span>
          </h1>
          <p className="text-gray-200 text-lg font-medium">
            Every purchase made through our curated links funds reforestation projects globally at no extra cost to you.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button className="bg-[#1dc91d] text-[#112111] px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
            Start Exploring
          </button>
          <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors">
            How it Works
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
