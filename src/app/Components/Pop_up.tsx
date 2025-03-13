"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the popup has already been shown in this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");

    if (!hasSeenPopup) {
      setIsOpen(true);
      sessionStorage.setItem("hasSeenPopup", "true"); // Mark as seen for this session
    }
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
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
