
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


        {/* Map Marker 1 */}

        <Map />



      </div>
    </section>
  );
};

export default GlobalMap;
