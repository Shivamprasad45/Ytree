// components/Scene.tsx
"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useEffect, useRef, useState } from "react";

interface SceneProps {
    scene: {
        id: number;
        video: string;
        text: string;
    };
    index: number;
    activeScene: MotionValue<number>;
}

export default function Scene({ scene, index, activeScene }: SceneProps) {
    const prefersReducedMotion = useReducedMotion();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [posterLoaded, setPosterLoaded] = useState(false);

    // Smooth fade in/out based on scroll position
    const opacity = useTransform(
        activeScene,
        [index - 0.5, index, index + 0.5],
        [0, 1, 0]
    );

    // Text animation - slide up and fade in when scene is active
    const textY = useTransform(
        activeScene,
        [index - 0.3, index, index + 0.3],
        [20, 0, -20]
    );

    const textOpacity = useTransform(
        activeScene,
        [index - 0.2, index, index + 0.2],
        [0, 1, 0]
    );

    // Auto-play video when scene is active, pause when not (works on mobile too!)
    useEffect(() => {
        if (!videoRef.current || prefersReducedMotion) return;

        const unsubscribe = activeScene.on("change", (latest) => {
            const isActive = Math.abs(latest - index) < 0.5;

            if (isActive && videoRef.current?.paused) {
                videoRef.current.play().catch(() => {
                    // Auto-play failed, ignore
                });
            } else if (!isActive && !videoRef.current?.paused) {
                videoRef.current?.pause();
            }
        });

        return () => unsubscribe();
    }, [activeScene, index, prefersReducedMotion]);

    return (
        <motion.section
            style={{ opacity }}
            className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        >
            {/* Background Media - Videos play on all devices! */}
            {prefersReducedMotion ? (
                <div
                    className="absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-500"
                    style={{
                        backgroundImage: posterLoaded
                            ? `url(/posters/scene${index + 1}.jpg)`
                            : 'none',
                        backgroundColor: "#1a1a1a"
                    }}
                >
                    {/* Preload poster image for reduced motion users */}
                    <img
                        src={`/posters/scene${index + 1}.jpg`}
                        alt=""
                        className="hidden"
                        onLoad={() => setPosterLoaded(true)}
                        onError={() => {
                            console.warn(`Poster for scene ${index + 1} not found`);
                            setPosterLoaded(true);
                        }}
                    />
                </div>
            ) : (
                <video
                    ref={videoRef}
                    src={scene.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            )}

            {/* Overlay Gradient - Strong enough for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/65" />

            {/* Text Content - Original minimal style */}
            <motion.div
                style={{
                    y: textY,
                    opacity: textOpacity
                }}
                className="relative z-10 px-4 md:px-6 max-w-4xl text-center"
            >
                <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-wide drop-shadow-2xl">
                    {scene.text}
                </h1>

                {/* Mobile scroll hint (only on first scene) */}
                {index === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                        className="mt-8 md:hidden"
                    >
                        <svg
                            className="w-6 h-6 mx-auto text-white/80"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                        <p className="text-white/70 text-sm mt-2">Scroll to continue</p>
                    </motion.div>
                )}
            </motion.div>
        </motion.section>
    );
}
