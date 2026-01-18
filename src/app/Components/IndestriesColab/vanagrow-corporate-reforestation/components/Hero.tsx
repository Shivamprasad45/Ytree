
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="p-6 md:p-10">
      <div 
        className="relative min-h-[520px] rounded-xl overflow-hidden flex flex-col justify-center px-8 md:px-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJFxhnzdHMMZ4aMYsUvi_d_mi9u-vpGYFjhbgdPq4zkUwadrciXtZsm0OfLzCBShmI0tjmDg-ymgzZLPwJvEYNxkpgsBrphVj9nLix3ePjkxyyjocAcg8cK_mKGft_JoPjqQqE_K9-EBWN36t5RT61afqMnHvx8N8D4ZHhCSvhbwBViF-fW_-DtdpLQt1FBS-LEdcpbW7ZLdy4rDlkzgwmR2_z6n4Isfa3S31VUU5awoC8KYNd3Xq2LCWVVqlmFzfGIrV2fdJhQQc5")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-[700px] flex flex-col gap-6">
          <span className="inline-block bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest w-fit">
            Corporate Partnerships
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
            Scale Your Corporate Impact – Partner with VanaGrow
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-normal max-w-[600px]">
            Driving measurable ESG results through large-scale reforestation and community-driven planting initiatives.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <a href="#apply" className="bg-primary hover:bg-primary/90 text-[#111811] px-8 py-4 rounded-xl text-base font-bold transition-all flex items-center gap-2">
              Apply for Partnership
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl text-base font-bold transition-all">
              View Impact Reports
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
