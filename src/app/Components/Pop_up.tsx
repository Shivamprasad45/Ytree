"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setIsOpen(true);
      sessionStorage.setItem("hasSeenPopup", "true");
    }
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-green-600">
              Start a New Journey! 🌱
            </h2>
            <p className="mt-3 text-gray-700">
              &quot;Every great journey begins with a single step. Plant your
              first tree today and make a difference!&quot;
            </p>
            <Link href={"/Tree/Free_clam_tree"}>
              <button
                className="mt-5 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                onClick={() => setIsOpen(false)}
              >
                🌳 Claim Your Free Tree
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupModal;
