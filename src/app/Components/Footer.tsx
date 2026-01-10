"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  MapPin,
  Phone
} from "lucide-react";

const Footer = () => {
  const pathname = usePathname();

  // Don't show footer on auth pages
  if (["/Signup", "/login", "/Resend"].includes(pathname)) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <span className="text-primary">Vana</span>
                <span className="text-foreground">Grow</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We are on a mission to make the planet greener, one tree at a time.
              Join our community and make a lasting impact on the environment.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://www.instagram.com/vana_grow/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors text-foreground shadow-sm"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/vanagrow/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors text-foreground shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="bg-background p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors text-foreground shadow-sm"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/About" className="hover:text-primary hover:underline transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-primary hover:underline transition-all">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary hover:underline transition-all">
                  Our Blog
                </Link>
              </li>
              <li>
                <Link href="/Tree/Global" className="hover:text-primary hover:underline transition-all">
                  Tree Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-6">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/Contact" className="hover:text-primary hover:underline transition-all">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/PrivacyPolicy" className="hover:text-primary hover:underline transition-all">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/Terms" className="hover:text-primary hover:underline transition-all">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-primary hover:underline transition-all">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  123 Green Street, <br />
                  Eco City, Earth 10101
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:support@vanagrow.com" className="hover:text-primary">
                  support@vanagrow.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary">
                  +91 987 654 3210
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} VanaGrow (Plant Paradise). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
