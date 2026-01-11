"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const LowGravityEffect = () => {
    // Generate random particles
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

    useEffect(() => {
        const particleCount = 15; // Number of floating particles
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // Random percentage for X
            y: Math.random() * 100, // Random percentage for Y
            size: Math.random() * 4 + 1, // Random size between 1px and 5px
            duration: Math.random() * 10 + 10, // Random duration between 10s and 20s
        }));
        setParticles(newParticles);
    }, []);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, -200]); // Parallax effect
    const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
            {particles.map((particle, index) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-primary/20 dark:bg-primary/10 blur-[1px]"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        y: index % 2 === 0 ? y1 : y2, // Apply different parallax speeds
                    }}
                    animate={{
                        y: [0, -100, 0], // Float up and down
                        x: [0, 50, 0], // Drift sideways
                        opacity: [0.2, 0.6, 0.2], // Fade in and out
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.5, 1], // Keyframe timing
                    }}
                />
            ))}

            {/* Adding some larger, very subtle "orbs" for more depth like dust motes */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
        </div>
    );
};

export default LowGravityEffect;
