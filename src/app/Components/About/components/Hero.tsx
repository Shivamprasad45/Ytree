
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#112111]">
      <div className="absolute inset-0 opacity-60">
        <img 
          alt="Lush green forest floor with sunlight" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHIska-uuChOzF10XhNnq7J_tAIFh_uW6S-jY6Fy4gG6Geo0BHO77Jk79sVcwyxvTOzGyM_yd8u9-2yPht_7b3q_fcpoZ3rWFXQ0k1FQrm5kJush9NYKgO6AQw3YpwuAHZzFGGmquh5f7HablsmcM8xcnTbIO4nSAl_GcGvE5zJWJa_rbz1RKevbqC7TNmCNDajGMybtgwQvM5yJfd0QxcQQhPU564M3uU8TvrRmXarY0pHBtP99goTZUwSSs_W2I90AxgIhqjgp5A"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#112111] via-transparent to-transparent"></div>
      <div className="relative z-10 text-center px-6 max-w-[960px]">
        <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] tracking-[-0.033em] mb-6">
          Re-greening the Planet, <br className="hidden sm:block" />One Purchase at a Time
        </h1>
        <p className="text-white/90 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-10">
          Harnessing global commerce to restore the world's forests and protect biodiversity for future generations.
        </p>
        <button className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform active:scale-95">
          <span className="material-symbols-outlined">play_circle</span>
          Watch Our Story
        </button>
      </div>
    </section>
  );
};

export default Hero;
