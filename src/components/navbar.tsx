'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/app/contexts/languageContext';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { t, locale, switchLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation to sections
  const handleSectionNavigation = (sectionId: string) => {
    setMobileMenuOpen(false);

    // If we're not on the home page, navigate to home page first
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
    } else {
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

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    handleSectionNavigation(sectionId);
  };

  const handleLanguageSwitch = (newLocale: string) => {
    switchLanguage(newLocale);
    setLanguageDropdownOpen(false);
    setMobileMenuOpen(false);
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
              <Link href="/" className="cursor-pointer" style={{fontFamily: 'cursive'}}>
                <img src="/img/casaSemelle.png" alt="casaSemelle logo" className="h-16" />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-slate-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium"
            >
              {t('nav.home')}
            </Link>
            <Link 
              href="/aboutUs" 
              className="text-slate-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium"
            >
              {t('nav.about')}
            </Link>
            <Link 
              href="/products" 
              className="text-slate-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium"
            >
              {t('nav.products')}
            </Link>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')}
              className="text-slate-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium cursor-pointer"
            >
              {t('nav.contact')}
            </a>

            {/* Language Switcher */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 text-slate-700 hover:text-amber-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-slate-50"
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium uppercase">{locale}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Language Dropdown */}
              {languageDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-slate-200 rounded-lg shadow-xl z-50">
                  <button
                    onClick={() => handleLanguageSwitch('en')}
                    className={`block w-full px-4 py-2 text-sm text-left hover:bg-slate-50 transition-colors ${
                      locale === 'en' ? 'text-amber-600 font-medium bg-amber-50' : 'text-slate-700'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageSwitch('fr')}
                    className={`block w-full px-4 py-2 text-sm text-left hover:bg-slate-50 transition-colors ${
                      locale === 'fr' ? 'text-amber-600 font-medium bg-amber-50' : 'text-slate-700'
                    }`}
                  >
                    Français
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={(e) => handleNavClick(e, 'contact')}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-md font-medium text-sm hover:bg-amber-600 transition-all duration-300 cursor-pointer"
            >
              {t('nav.getQuote')}
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
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 hover:text-amber-600 transition-colors"
          >
            {t('nav.home')}
          </Link>
          <Link 
            href="/aboutUs" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 hover:text-amber-600 transition-colors"
          >
            {t('nav.about')}
          </Link>
          <Link 
            href="/products" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 hover:text-amber-600 transition-colors"
          >
            {t('nav.products')}
          </Link>
          <a 
            href="#news" 
            onClick={(e) => {
              handleNavClick(e, 'news');
              setMobileMenuOpen(false);
            }}
            className="block py-2 text-slate-700 hover:text-amber-600 transition-colors cursor-pointer"
          >
            {t('nav.news')}
          </a>
          <a 
            href="#contact" 
            onClick={(e) => {
              handleNavClick(e, 'contact');
              setMobileMenuOpen(false);
            }}
            className="block py-2 text-slate-700 hover:text-amber-600 transition-colors cursor-pointer"
          >
            {t('nav.contact')}
          </a>

          {/* Mobile Language Switcher */}
          <div className="pt-4 border-t border-slate-200">
            <p className="text-sm font-medium text-slate-600 mb-2">Language / Langue</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleLanguageSwitch('en')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  locale === 'en' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageSwitch('fr')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  locale === 'fr' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Français
              </button>
            </div>
          </div>

          <button 
            onClick={(e) => {
              handleNavClick(e, 'contact');
              setMobileMenuOpen(false);
            }}
            className="w-full mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-md font-medium text-sm cursor-pointer"
          >
            {t('nav.getQuote')}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;