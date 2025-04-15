"use client";
import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PlantUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  plantName: string;
}

const PlantUnlockModal: React.FC<PlantUnlockModalProps> = ({
  isOpen,
  onClose,
  plantName,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger confetti when modal opens
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Auto-close the modal after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      // Clear the timeout if the component unmounts or if isOpen changes
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 w-5/6 max-w-md text-center shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-3xl mb-2 text-green-600">
              🎉 Congratulations! 🎉
            </div>
            <div className="text-xl mb-4">You&apos;ve unlocked:</div>

            <motion.div
              className="text-3xl font-bold text-green-700 my-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {plantName}
            </motion.div>

            <motion.div
              className="relative w-36 h-36 mx-auto mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <div className="text-8xl">🌱</div>
            </motion.div>

            <Button
              onClick={onClose}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full"
              size="lg"
            >
              Continue
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlantUnlockModal;
