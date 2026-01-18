
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-dark text-white/60 py-12 px-6 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-white mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">eco</span>
              <span className="text-xl font-bold">VanaGrow</span>
            </div>
            <p className="max-w-sm leading-relaxed mb-6">
              VanaGrow is a certified B-Corp dedicated to forest restoration through sustainable digital commerce. Every pixel is proof of our promise.
            </p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Company</h5>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-primary transition-colors" href="#">Impact Report</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Press Kit</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Connect</h5>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-primary transition-colors" href="#">Instagram</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Twitter</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">LinkedIn</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs">
          <p>© 2024 VanaGrow. All rights reserved. Registered Charity No. 883920</p>
          <div className="flex gap-6">
            <a className="hover:text-white" href="#">Privacy Policy</a>
            <a className="hover:text-white" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
