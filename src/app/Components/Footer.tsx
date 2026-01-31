"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const pathname = usePathname();

  // Don't show footer on auth pages
  if (["/Signup", "/login", "/Resend"].includes(pathname)) {
    return null;
  }

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-sage/10 dark:border-gray-800 pt-16 sm:pt-24 pb-8 sm:pb-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Contact Information Section - Prominent */}
        <div className="bg-gradient-to-br from-primary/5 to-green-50 dark:from-primary/10 dark:to-gray-800 rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16 border border-primary/10">
          <h3 className="text-xl sm:text-2xl font-bold text-deep-forest dark:text-white mb-6">Get in Touch</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <a
              href="mailto:support@vanagrow.com"
              className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all group"
              aria-label="Email us at support@vanagrow.com"
            >
              <Mail className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-xs text-sage dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm font-medium text-deep-forest dark:text-white">support@vanagrow.com</p>
              </div>
            </a>

            <a
              href="tel:+911234567890"
              className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all group"
              aria-label="Call us at +91 123 456 7890"
            >
              <Phone className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-xs text-sage dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">Phone</p>
                <p className="text-sm font-medium text-deep-forest dark:text-white">+91 830 336 7981</p>
              </div>
            </a>

            <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-sage dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">Location</p>
                <p className="text-sm font-medium text-deep-forest dark:text-white">Mumbai, India</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-sage dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">Hours</p>
                <p className="text-sm font-medium text-deep-forest dark:text-white">Mon-Sat: 9AM-6PM IST</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 mb-16 sm:mb-24">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
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
            <p className="text-sage dark:text-gray-400 max-w-xs leading-relaxed text-base sm:text-lg mb-8 sm:mb-10 font-medium">
              Empowering consumers to restore the earth&apos;s vital ecosystems through sustainable shopping and transparent reforestation.
            </p>

            {/* Trust Badges */}
            <div className="mb-8">
              <p className="text-xs font-semibold text-sage dark:text-gray-400 uppercase tracking-wider mb-3">Verified & Trusted</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                  ✓ GPS Verified Trees
                </span>
                <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                  ✓ Carbon Certified
                </span>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-5">
              <a
                href="https://www.instagram.com/vana_grow/"
                target="_blank"
                rel="noopener noreferrer"
                className="size-11 sm:size-12 rounded-full bg-sage/5 dark:bg-gray-800 flex items-center justify-center text-deep-forest dark:text-white hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-sm"
                aria-label="Visit our Instagram page"
              >
                <span className="material-symbols-outlined text-xl">public</span>
              </a>
              <a
                href="https://www.linkedin.com/in/vanagrow/"
                target="_blank"
                rel="noopener noreferrer"
                className="size-11 sm:size-12 rounded-full bg-sage/5 dark:bg-gray-800 flex items-center justify-center text-deep-forest dark:text-white hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-sm"
                aria-label="Visit our LinkedIn page"
              >
                <span className="material-symbols-outlined text-xl">diversity_3</span>
              </a>
              <a
                href="mailto:support@vanagrow.com"
                className="size-11 sm:size-12 rounded-full bg-sage/5 dark:bg-gray-800 flex items-center justify-center text-deep-forest dark:text-white hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-sm"
                aria-label="Email us"
              >
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-base sm:text-lg mb-6 sm:mb-8 text-deep-forest dark:text-white">Platform</h4>
            <ul className="flex flex-col gap-4 sm:gap-5 text-sage dark:text-gray-400 text-sm sm:text-base font-medium">
              <li><Link className="hover:text-primary transition-colors inline-block" href="/shop">Browse Products</Link></li>
              <li><Link className="hover:text-primary transition-colors inline-block" href="/Tree/Global">Planting Sites</Link></li>
              <li><Link className="hover:text-primary transition-colors inline-block" href="/Tree/Global">The Forest Map</Link></li>
              <li><Link className="hover:text-primary transition-colors inline-block" href="/Planted">Leaderboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base sm:text-lg mb-6 sm:mb-8 text-deep-forest dark:text-white">Company</h4>
            <ul className="flex flex-col gap-4 sm:gap-5 text-sage dark:text-gray-400 text-sm sm:text-base font-medium">
              <li><Link className="hover:text-primary transition-colors inline-block" href="/About">Our Story</Link></li>
              <li><Link className="hover:text-primary transition-colors inline-block" href="/blog">Impact Report</Link></li>
              <li><Link className="hover:text-primary transition-colors inline-block" href="/how-it-works">How It Works</Link></li>
              <li><Link className="hover:text-primary transition-colors inline-block" href="/blog">Press Kit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base sm:text-lg mb-6 sm:mb-8 text-deep-forest dark:text-white">Support</h4>
            <ul className="flex flex-col gap-4 sm:gap-5 text-sage dark:text-gray-400 text-sm sm:text-base font-medium">
              <li><Link className="hover:text-primary transition-colors inline-block" href="/Contact">Help Center</Link></li>
              <li><Link className="hover:text-primary transition-colors inline-block" href="/Planted">Track My Tree</Link></li>
              <li><Link className="hover:text-primary transition-colors inline-block" href="/Contact">Contact Us</Link></li>
              <li><Link className="hover:text-primary transition-colors inline-block" href="/PrivacyPolicy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-sage/10 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 text-sage dark:text-gray-400 text-xs sm:text-sm font-semibold">
          <p className="text-center sm:text-left">© 2024 Vanagrow Foundation. All rights reserved. Reforesting the world, one purchase at a time.</p>
          <div className="flex gap-6 sm:gap-10">
            <Link className="hover:text-deep-forest dark:hover:text-white transition-colors" href="/Terms">Terms of Service</Link>
            <Link className="hover:text-deep-forest dark:hover:text-white transition-colors" href="/refund">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
