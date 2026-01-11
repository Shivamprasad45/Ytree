
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative px-6 py-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative overflow-hidden rounded-3xl min-h-[600px] flex items-center justify-center p-8 text-center bg-hero-pattern bg-cover bg-center">
          <div className="max-w-3xl flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
              Nurturing the Earth, <br /><span className="text-primary">One Tree</span> at a Time.
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Join the movement to restore global forests through sustainable shopping. Every purchase helps us reforest the planet.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-primary text-deep-forest text-lg font-bold hover:bg-white transition-all transform hover:scale-105 active:scale-95">
                Plant Your First Tree
              </button>
              <button className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-white/10 backdrop-blur-md text-white border border-white/30 text-lg font-bold hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95">
                Explore Forests
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
