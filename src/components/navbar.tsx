'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

// ============================================
// NAVBAR COMPONENT (Reusable across pages)
// ============================================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation to sections
  const handleSectionNavigation = (sectionId: string) => {
    // Close mobile menu if open
    setMobileMenuOpen(false);

    // If we're not on the home page, navigate to home page first
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
    } else {
      // If we're already on home page, scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          const offset = 100;
          
          window.scrollTo({
            top: absoluteElementTop - offset,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  // Handle click for navigation items
  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    handleSectionNavigation(sectionId);
  };

  // Handle regular page navigation
  const handlePageNavigation = (path: string) => {
    setMobileMenuOpen(false);
    router.push(path);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl lg:text-3xl font-bold text-slate-900">
              <a 
                href="/" 
                onClick={(e) => {
                  e.preventDefault();
                  handlePageNavigation('/');
                }}
                className="cursor-pointer"
              >
                Sole<span className="text-amber-600">Tech</span>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                handlePageNavigation('/');
              }}
              className="text-slate-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium"
            >
              Home
            </a>
            <a 
              href="/aboutUs" 
              onClick={(e) => {
                e.preventDefault();
                handlePageNavigation('/aboutUs');
              }}
              className="text-slate-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium"
            >
              About Us
            </a>
            <a 
              href="/products" 
              onClick={(e) => {
                e.preventDefault();
                handlePageNavigation('/products');
              }}
              className="text-slate-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium"
            >
              Products
            </a>
            <a 
              href="#news" 
              onClick={(e) => handleNavClick(e, 'news')}
              className="text-slate-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium"
            >
              News
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')}
              className="text-slate-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium"
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={(e) => handleNavClick(e, 'contact')}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-md font-medium text-sm hover:bg-amber-600 transition-all duration-300 cursor-pointer"
            >
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
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              handlePageNavigation('/');
            }}
            className="block py-2 text-slate-700 hover:text-amber-600 transition-colors"
          >
            Home
          </a>
          <a 
            href="#about" 
            onClick={(e) => handleNavClick(e, 'about')}
            className="block py-2 text-slate-700 hover:text-amber-600 transition-colors"
          >
            About Us
          </a>
          <a 
            href="/products" 
            onClick={(e) => {
              e.preventDefault();
              handlePageNavigation('/products');
            }}
            className="block py-2 text-slate-700 hover:text-amber-600 transition-colors"
          >
            Products
          </a>
          <a 
            href="#news" 
            onClick={(e) => handleNavClick(e, 'news')}
            className="block py-2 text-slate-700 hover:text-amber-600 transition-colors"
          >
            News
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, 'contact')}
            className="block py-2 text-slate-700 hover:text-amber-600 transition-colors"
          >
            Contact
          </a>
          <button 
            onClick={(e) => handleNavClick(e, 'contact')}
            className="w-full mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-md font-medium text-sm cursor-pointer"
          >
            Get Quote
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;