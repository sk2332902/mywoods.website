import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, TreeDeciduous } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-auto text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <TreeDeciduous className="h-7 w-7 text-cyan-400" />
              <span className="text-xl font-bold tracking-tight text-white">
                Mywoods
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Creating modern, responsive, and user-friendly web experiences for managing global timber supply chains and inventory.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/woods" className="hover:text-cyan-400 transition-colors duration-200">
                  Woods
                </Link>
              </li>
              <li>
                <Link to="/cms" className="hover:text-cyan-400 transition-colors duration-200">
                  CMS Dashboard (Admin)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-base tracking-wider uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3 text-slate-400">
                <Mail className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                <a href="mailto:hello@example.com" className="hover:text-white transition-colors duration-200">
                  hello@example.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <Phone className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors duration-200">
                  +91 9876543210
                </a>
              </li>
              <li className="flex items-start space-x-3 text-slate-400">
                <MapPin className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Lucknow, Uttar Pradesh, India</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Mywoods. All rights reserved.</p>
          <div className="flex space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
