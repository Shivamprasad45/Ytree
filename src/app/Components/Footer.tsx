"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
  const pathname = usePathname();

  // Don't show footer on auth pages
  if (["/Signup", "/login", "/Resend"].includes(pathname)) {
    return null;
  }

  return (
    <footer className="bg-white border-t border-sage/10 pt-24 pb-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="text-primary">
                <div className="relative w-8 h-8">
                  <Image
                    fill
                    alt="VanaGrow Logo"
                    src="/logo.png"
                    className="object-contain"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-black tracking-tight">Vanagrow</h2>
            </div>
            <p className="text-sage max-w-xs leading-relaxed text-lg mb-10 font-medium">
              Empowering consumers to restore the earth&apos;s vital ecosystems through sustainable shopping and transparent reforestation.
            </p>
            <div className="flex gap-5">
              <a
                href="https://www.instagram.com/vana_grow/"
                target="_blank"
                rel="noopener noreferrer"
                className="size-12 rounded-full bg-sage/5 flex items-center justify-center text-deep-forest hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-sm"
              >
                <span className="material-symbols-outlined">public</span>
              </a>
              <a
                href="https://www.linkedin.com/in/vanagrow/"
                target="_blank"
                rel="noopener noreferrer"
                className="size-12 rounded-full bg-sage/5 flex items-center justify-center text-deep-forest hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-sm"
              >
                <span className="material-symbols-outlined">diversity_3</span>
              </a>
              <a
                href="mailto:support@vanagrow.com"
                className="size-12 rounded-full bg-sage/5 flex items-center justify-center text-deep-forest hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-sm"
              >
                <span className="material-symbols-outlined">mail</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8">Platform</h4>
            <ul className="flex flex-col gap-5 text-sage text-base font-medium">
              <li><Link className="hover:text-primary transition-colors" href="/shop">Browse Products</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/Tree/Global">Planting Sites</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/Tree/Global">The Forest Map</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/Planted">Leaderboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8">Company</h4>
            <ul className="flex flex-col gap-5 text-sage text-base font-medium">
              <li><Link className="hover:text-primary transition-colors" href="/About">Our Story</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/blog">Impact Report</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/how-it-works">Careers</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/blog">Press Kit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8">Support</h4>
            <ul className="flex flex-col gap-5 text-sage text-base font-medium">
              <li><Link className="hover:text-primary transition-colors" href="/Contact">Help Center</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/Planted">Track My Tree</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/Contact">Contact Us</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/PrivacyPolicy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* <div className="pt-10 border-t border-sage/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sage text-sm font-semibold">
          <p>© 2024 Vanagrow Foundation. All rights reserved. Reforesting the world, one purchase at a time.</p>
          <div className="flex gap-10">
            <Link className="hover:text-deep-forest transition-colors" href="/Terms">Terms of Service</Link>
            <Link className="hover:text-deep-forest transition-colors" href="/refund">Cookie Settings</Link>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
