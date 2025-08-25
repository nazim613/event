import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Left Side - Navigation Links */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-gray-900 font-medium text-lg">Dehradun Hangouts</span>
            </div>
            
            <nav className="flex flex-col md:flex-row gap-4 md:gap-8">
                              <a href="#" className="text-gray-300 hover:text-black transition-colors text-sm font-medium">
                Discover
              </a>
              <a href="#" className="text-gray-300 hover:text-black transition-colors text-sm font-medium">
                Events
              </a>
              <a href="#" className="text-gray-300 hover:text-black transition-colors text-sm font-medium">
                Community
              </a>
              <a href="#" className="text-gray-300 hover:text-black transition-colors text-sm font-medium">
                Help
              </a>
            </nav>
          </div>

          {/* Right Side - Social Links */}
          <div className="flex items-center space-x-4">
            <a 
              href="mailto:dehradunhangouts@gmail.com" 
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
              title="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      

      {/* Bottom Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2025 Dehradun Hangouts. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-black-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-black-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-black-300 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;