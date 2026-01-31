"use client";

import React from 'react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative overflow-hidden rounded-3xl min-h-[500px] sm:min-h-[600px] flex items-center justify-center p-6 sm:p-8 text-center bg-hero-pattern bg-cover bg-center">
          {/* Overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/20 rounded-3xl" aria-hidden="true"></div>

          {/* Floating leaves animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl" aria-hidden="true">
            <div className="absolute top-10 left-10 text-4xl opacity-30 animate-float-slow">🍃</div>
            <div className="absolute top-32 right-20 text-3xl opacity-25 animate-float-delayed">🌿</div>
            <div className="absolute bottom-20 left-1/4 text-3xl opacity-20 animate-float">🍂</div>
          </div>

          <div className="relative z-10 max-w-3xl flex flex-col gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] tracking-tight drop-shadow-lg">
              Transform Your Purchases Into{' '}
              <br className="hidden sm:block" />
              <span className="text-primary animate-pulse-slow">Living Forests</span>
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto drop-shadow-md leading-relaxed">
              Shop sustainable products and plant real, trackable trees. Every purchase creates verified forest restoration with GPS coordinates you can visit.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-2">
              {/* Primary CTA with animated seedling */}
              <Link
                href="/Tree/Free_clam_tree"
                className="group relative flex min-w-[200px] min-h-[48px] sm:min-h-[56px] cursor-pointer items-center justify-center gap-3 rounded-full px-6 sm:px-8 bg-primary text-deep-forest text-base sm:text-lg font-bold hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl overflow-hidden"
                aria-label="Claim your free tree and start planting"
              >
                {/* Animated growing seedling icon */}
                <span className="relative inline-flex items-center justify-center">
                  <span className="text-2xl animate-grow-seedling">🌱</span>
                  <span className="absolute inset-0 text-2xl animate-ping-slow opacity-20">🌱</span>
                </span>
                <span className="relative z-10">Claim Your Free Tree</span>
                {/* Sparkle effect on hover */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">✨</span>
              </Link>

              {/* Secondary CTA with rotating earth */}
              <Link
                href="/Tree/Global"
                className="group relative flex min-w-[200px] min-h-[48px] sm:min-h-[56px] cursor-pointer items-center justify-center gap-3 rounded-full px-6 sm:px-8 bg-white/10 backdrop-blur-md text-white border-2 border-white/40 text-base sm:text-lg font-bold hover:bg-white/20 hover:border-white/60 transition-all transform hover:scale-105 active:scale-95"
                aria-label="Explore our global forest map"
              >
                {/* Animated rotating earth icon */}
                <span className="text-2xl animate-spin-earth">🌍</span>
                <span className="relative z-10">Explore Forest Map</span>
                {/* Orbiting effect */}
                <span className="absolute top-1/2 left-8 w-1 h-1 bg-white/50 rounded-full animate-orbit opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            </div>

            {/* Inspirational tagline with heartbeat effect */}
            <div className="mt-4 flex items-center justify-center gap-2 text-white/80 text-sm font-medium">
              <span className="text-lg animate-heartbeat">💚</span>
              <span>Join 500+ communities restoring our planet</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(8deg); }
        }
        
        @keyframes grow-seedling {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.1) translateY(-2px); }
        }
        
        @keyframes spin-earth {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(1); opacity: 0.2; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(1.1); }
          20%, 40% { transform: scale(1); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(20px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 1s; }
        .animate-grow-seedling { animation: grow-seedling 2s ease-in-out infinite; }
        .animate-spin-earth { animation: spin-earth 20s linear infinite; }
        .animate-ping-slow { animation: ping-slow 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
        .animate-orbit { animation: orbit 3s linear infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
