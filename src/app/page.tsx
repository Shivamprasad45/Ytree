"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { scenes } from "@/lib/scenes";
import Scene from "@/components/Scene";
import Homes from "./pages/Home";
import GoogleAds from "./Components/Home/GoogleAds";
import GoogleAd from "./Components/GoogleAd";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to active scene index
  const activeScene = useTransform(
    scrollYProgress,
    scenes.map((_, i) => i / scenes.length),
    scenes.map((_, i) => i)
  );

  return (
    <>
      {/* Scroll-based storytelling section */}



      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black">
        {scenes.map((scene) => (
          <div key={scene.id} className="h-screen snap-start relative">

            <video
              src={scene.video}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80"></div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]"></div>

            <div className="relative z-10 flex items-center justify-center h-full">
              <h1 className="text-white text-5xl md:text-7xl font-bold text-center px-6 animate-fadeUp">
                {scene.text}
              </h1>
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
