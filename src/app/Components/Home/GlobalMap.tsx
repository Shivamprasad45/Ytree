
import dynamic from 'next/dynamic';
import React from 'react';
const Map = dynamic(() => import("@/app/Components/Map_components"), {
  ssr: false, // This disables server-side rendering for this component
  loading: () => <p>Loading map...</p>, // Optional: display a loading message or component
});
const GlobalMap: React.FC = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-24">
      <h2 className="text-deep-forest text-3xl font-black mb-10 text-center">Our Global Impact Sites</h2>
      <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl group border-8 border-white">
        <div className="absolute inset-0 bg-sage/10 mix-blend-multiply z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-700"></div>
        <div className="w-full h-full bg-map-pattern bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110"></div>

        {/* Map Marker 1 */}
        <div className="absolute top-[30%] left-[25%] z-20 group/marker">
          <div className="size-8 bg-primary rounded-full animate-ping absolute opacity-75"></div>
          <div className="size-8 bg-primary rounded-full border-4 border-white relative cursor-pointer shadow-lg"></div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-all translate-y-2 group-hover/marker:translate-y-0 shadow-xl border border-sage/10">
            🌳 Amazonas: 240k Trees
          </div>
        </div>

        {/* Map Marker 2 */}
        <div className="absolute top-[50%] left-[60%] z-20 group/marker">
          <div className="size-8 bg-primary rounded-full animate-ping absolute opacity-75"></div>
          <div className="size-8 bg-primary rounded-full border-4 border-white relative cursor-pointer shadow-lg"></div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-all translate-y-2 group-hover/marker:translate-y-0 shadow-xl border border-sage/10">
            🌳 Congo Basin: 120k Trees
          </div>
        </div>

        <div className="absolute bottom-10 left-10 z-30 bg-white/95 backdrop-blur-md p-8 rounded-[2rem] max-w-xs shadow-2xl hidden md:block border border-white/50 animate-in fade-in zoom-in duration-500">
          <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-3">Live Impact Map</p>
          <h4 className="text-3xl font-extrabold leading-tight 
           text-black dark:text-white">Real-time Verification</h4>
          <p className="text-sm text-sage leading-relaxed">
            We use satellite imagery and local field teams to verify every single tree planted. Transparency is our core value.
          </p>
          <button className="mt-6 text-sm font-bold flex items-center gap-2 hover:text-primary transition-colors">
            View Live Stream <span className="material-symbols-outlined text-sm">videocam</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GlobalMap;
