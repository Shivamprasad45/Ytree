
import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-24">
      <div className="bg-deep-forest rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 size-96 bg-primary/20 blur-[120px] transition-all group-hover:bg-primary/30"></div>
        <div className="absolute bottom-0 left-0 size-96 bg-sage/20 blur-[120px] transition-all group-hover:bg-sage/30"></div>
        
        <div className="relative z-10 animate-in zoom-in duration-700">
          <h2 className="text-white text-5xl md:text-7xl font-black mb-10 leading-tight tracking-tight">
            Ready to grow your <br />
            <span className="text-primary italic">own digital forest?</span>
          </h2>
          <p className="text-white/70 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Join 50,000+ eco-conscious shoppers making a measurable impact every day.
          </p>
          
          <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              className="h-16 px-10 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:ring-4 focus:ring-primary/30 focus:border-primary outline-none flex-grow text-lg backdrop-blur-md transition-all" 
              placeholder="Enter your email" 
              type="email" 
              required
            />
            <button className="h-16 px-12 rounded-full bg-primary text-deep-forest font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              Get Started
            </button>
          </form>
          
          <p className="text-white/40 text-sm mt-8 font-medium">
            By signing up, you agree to our <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
