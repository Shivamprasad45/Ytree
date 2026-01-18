
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-solid border-[#dce5dc] dark:border-[#2a3a2a]">
      <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between whitespace-nowrap">
        <div className="flex items-center gap-4 text-[#111711] dark:text-white">
          <div className="size-6 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">eco</span>
          </div>
          <h2 className="text-[#111711] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">VanaGrow</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <nav className="hidden md:flex items-center gap-9">
            <a className="text-[#111711] dark:text-white text-sm font-medium hover:text-primary transition-colors" href="#">Shop</a>
            <a className="text-[#111711] dark:text-white text-sm font-medium hover:text-primary transition-colors" href="#">Impact</a>
            <a className="text-primary text-sm font-bold underline underline-offset-4" href="#">About</a>
            <a className="text-[#111711] dark:text-white text-sm font-medium hover:text-primary transition-colors" href="#">Team</a>
          </nav>
          <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-opacity-90 transition-all">
            Join Movement
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
