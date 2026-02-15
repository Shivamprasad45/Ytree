"use client";

import { scenes } from "@/lib/scenes";
import Homes from "./pages/Home";
import GoogleAds from "./Components/Home/GoogleAds";
import GoogleAd from "./Components/GoogleAd";
import BlurIn from "@/components/ui/blur-in";

export default function Home() {
  return (
    <>
      {/* Scroll-based storytelling section */}

      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth 
                [scrollbar-width:none] 
                [-ms-overflow-style:none] 
                [&::-webkit-scrollbar]:hidden">
        {scenes.map((scene) => (
          <div key={scene.id} className="h-screen snap-start relative flex items-center justify-center overflow-hidden">
            {/* Background Video */}
            <video
              src={scene.video}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]"></div>

            {/* Video Text Overlay */}
            <div className="relative z-10 w-full px-6 h-48 md:h-72 flex items-center justify-center">
              <div className="w-full max-w-4xl h-full rounded-2xl px-4 py-4 md:px-10 md:py-6 flex items-center justify-center text-center">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-lg leading-tight">
                  {scene.text}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* CTA Section */}
      {/* <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
        <div className="relative z-10 px-6 py-20 text-center max-w-4xl">
          <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
            But it&apos;s not too late.
          </h2>
          <p className="text-white/90 text-xl md:text-2xl mb-12 font-light">
            Plant a Tree. Restore Balance.
          </p>
          <button className="px-12 py-5 bg-white text-green-900 rounded-full text-lg font-semibold hover:bg-green-50 transition-all duration-300 hover:scale-105 shadow-2xl">
            Start Planting Today
          </button>
        </div>

        {/* Decorative gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
      </div>
      {/* </section> */}

      {/* Original Homepage Content */}
      <div className="">
        <Homes />
        <div className="container mx-auto px-4">
          <GoogleAds />
          <GoogleAd slotId="8932948273" />
        </div>
      </div>
    </>
  );
}
