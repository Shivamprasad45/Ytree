
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-black py-12 border-t border-[#dbe6db] dark:border-[#2a3a2a]">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">park</span>
          <span className="text-xl font-bold dark:text-white">VanaGrow</span>
        </div>
        <p className="text-sm text-[#618961] dark:text-[#a0c0a0]">
          © 2024 VanaGrow Corporate Reforestation. All Rights Reserved.
        </p>
        <div className="flex gap-6">
          <a className="text-[#618961] hover:text-primary transition-colors text-sm" href="#">Privacy Policy</a>
          <a className="text-[#618961] hover:text-primary transition-colors text-sm" href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
