"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has permanently dismissed the popup
    const permanentlyDismissed = localStorage.getItem("popupPermanentlyDismissed");
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");

    if (!permanentlyDismissed && !hasSeenPopup) {
      // Delay popup by 15 seconds to avoid being intrusive
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenPopup", "true");
      }, 15000); // 15 second delay

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePermanentDismiss = () => {
    localStorage.setItem("popupPermanentlyDismissed", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Less opaque overlay - easier to see content behind */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
        onClick={handleClose}
        aria-label="Close popup overlay"
      >
        {/* Smaller, slide-in modal instead of full-screen */}
        <div
          className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 fade-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Larger, more accessible close button */}
          <button
            className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all"
            onClick={handleClose}
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <div className="mb-4 text-5xl">🌱</div>
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-3">
              Welcome to VanaGrow!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Start your reforestation journey today. Claim your first tree absolutely free and track its growth with GPS coordinates.
            </p>

            <div className="space-y-3">
              <Link href="/Tree/Free_clam_tree" onClick={handleClose}>
                <button className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-md">
                  🌳 Claim Your Free Tree
                </button>
              </Link>

              {/* Don't show again option */}
              <button
                className="w-full px-6 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                onClick={handlePermanentDismiss}
              >
                Don&apos;t show this again
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupModal;
