"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy } from "lucide-react";

type Winner = {
  firstName: string;
  treeCount: number;
};

// Move the function outside of the block
function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export default function WinnerAnnouncement({ winner }: { winner: Winner }) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (showConfetti) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval: NodeJS.Timeout = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 250);

      return () => clearInterval(interval);
    }
  }, [showConfetti]);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="text-center p-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg shadow-lg"
      >
        <motion.h2
          className="text-3xl font-bold text-white mb-4"
          animate={{ rotate: [0, -2, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Winner of the Year
        </motion.h2>
        <motion.div
          className="flex items-center justify-center space-x-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Trophy className="w-12 h-12 text-white" />
          <span className="text-4xl font-extrabold text-white">
            {winner.firstName}
          </span>
        </motion.div>
        <motion.div
          className="mt-4 text-2xl text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {winner.treeCount} trees planted!
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5 }}
            onAnimationComplete={() => setShowConfetti(false)}
            className="absolute inset-0 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
