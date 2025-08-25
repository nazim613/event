// components/Header.js

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[99]">
      <div className="bg-black/80 text-white rounded-full px-6 py-2 shadow-xl flex items-center space-x-4">
        {/* Logo/Icon */}
        <div className="w-10 h-9 rounded-full flex items-center justify-center flex-shrink-0">
          <img src="/logo.png" alt="Your Company Logo" className="w-12 h-10" style={{marginLeft:"-25px"}} />
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-4">
          <a
            href="/"
            className="text-sm font-medium hover:text-yellow-600 transition-colors"
          >
            Home
          </a>
          <a
            href="/events"
            className="text-sm font-medium hover:text-yellow-600 transition-colors"
          >
            Events
          </a>
          <a
            href="#contact"
            className="text-sm font-medium hover:text-yellow-600 transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}