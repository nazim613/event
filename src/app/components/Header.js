// components/Header.js

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-gray-900 text-white rounded-full px-6 py-2 shadow-xl flex items-center space-x-4">
        {/* Logo/Icon */}
        <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-4">
          <a
            href="#hero"
            className="text-sm font-medium hover:text-yellow-600 transition-colors"
          >
            Home
          </a>
          <a
            href="#solutions"
            className="text-sm font-medium hover:text-yellow-600 transition-colors"
          >
            Services
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