'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

// ============================================
// NAVBAR COMPONENT (Reusable across pages)
// ============================================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl lg:text-3xl font-bold text-slate-900">
              Sole<span className="text-amber-600">Tech</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-slate-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium">
              Home
            </a>
            <a href="#about" className="text-slate-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium">
              About Us
            </a>
            <div className="relative group">
              <button className="text-slate-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium flex items-center gap-1">
                Products
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="#eva" className="block px-4 py-3 hover:bg-slate-50 text-sm text-slate-700 hover:text-amber-600 transition-colors">EVA Soles</a>
                <a href="#microporous" className="block px-4 py-3 hover:bg-slate-50 text-sm text-slate-700 hover:text-amber-600 transition-colors">Microporous</a>
                <a href="#rubber" className="block px-4 py-3 hover:bg-slate-50 text-sm text-slate-700 hover:text-amber-600 transition-colors">Rubber</a>
                <a href="#cork" className="block px-4 py-3 hover:bg-slate-50 text-sm text-slate-700 hover:text-amber-600 transition-colors">Cork</a>
              </div>
            </div>
            <a href="#news" className="text-slate-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium">
              News
            </a>
            <a href="#contact" className="text-slate-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2.5 bg-slate-900 text-white rounded-md font-medium text-sm hover:bg-amber-600 transition-all duration-300">
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${
        mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-4 pt-2 pb-6 space-y-3 bg-white border-t border-slate-200">
          <a href="#home" className="block py-2 text-slate-700 hover:text-amber-600 transition-colors">Home</a>
          <a href="#about" className="block py-2 text-slate-700 hover:text-amber-600 transition-colors">About Us</a>
          <a href="#products" className="block py-2 text-slate-700 hover:text-amber-600 transition-colors">Products</a>
          <a href="#news" className="block py-2 text-slate-700 hover:text-amber-600 transition-colors">News</a>
          <a href="#contact" className="block py-2 text-slate-700 hover:text-amber-600 transition-colors">Contact</a>
          <button className="w-full mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-md font-medium text-sm">
            Get Quote
          </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;