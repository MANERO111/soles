'use client';
import React from 'react';
import Link from 'next/link';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
} from 'lucide-react';
import { useLanguage } from '@/app/contexts/languageContext';
import { useRouter, usePathname } from 'next/navigation';

export default function Footer() {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const handleSectionNavigation = (sectionId: string) => {
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

  const handleAboutPageNavigation = (sectionId: string) => {
    if (pathname !== '/aboutUs') {
      router.push(`/aboutUs#${sectionId}`);
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

  const handleFooterLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      handleSectionNavigation(sectionId);
    } else {
      router.push(href);
    }
  };

  const handleAboutPageLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    handleAboutPageNavigation(sectionId);
  };

  const footerLinks = {
    company: [
      { name: t('footer.links.company.home'), href: '/' },
      { name: t('footer.links.company.about'), href: '#about' },
      { name: t('footer.links.company.values'), href: '#values' },
      { name: t('footer.links.company.philosophy'), href: '#philosophy' },
      { name: t('footer.links.company.contact'), href: '#contact' },
    ],
    about: [
      { name: t('footer.links.about.ourMission'), href: 'mission' },
      { name: t('footer.links.about.ourJourney'), href: 'our-journey' },
      { name: t('footer.links.about.ourValues'), href: 'values' },
      { name: t('footer.links.about.ourTeam'), href: 'team' },
    ],
    products: [
      { name: t('footer.links.products.ourProducts'), href: '/products' },
    ],
    support: [
      { name: t('footer.links.support.contact'), href: '#contact' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-500 via-slate-800 to-slate-900 text-white overflow-hidden" style={{fontFamily: 'Inter, system-ui, -apple-system, sans-serif'}}>
      {/* Animated Background - UPDATED TO BRAND COLOR */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f2413b]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Brand Column */}
            <div className="lg:col-span-4 animate-slide-in-left">
              <div className="mb-6">
                <Link href="/" className="cursor-pointer" style={{fontFamily: 'cursive'}}>
                  <img src="img/casaSemelle.png" alt={t('footer.logoAlt')} className="h-24" />
                </Link>
                <p className="text-slate-400 leading-relaxed">
                  {t('footer.description')}
                </p>
              </div>

              {/* Contact Info - UPDATED HOVER COLORS */}
              <div className="space-y-3 mb-6">
                <a 
                  href="tel:+212522359446" 
                  className="flex items-center gap-3 text-slate-400 hover:text-[#f2413b] transition-colors group"
                >
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-[#f2413b] group-hover:scale-110 transition-all duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-sm">{t('footer.contact.phone')}</span>
                </a>
                <a 
                  href="mailto:casasemelle@gmail.com" 
                  className="flex items-center gap-3 text-slate-400 hover:text-[#f2413b] transition-colors group"
                >
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-[#f2413b] group-hover:scale-110 transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-sm">{t('footer.contact.email')}</span>
                </a>
                <div className="flex items-start gap-3 text-slate-400 group">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-[#f2413b] group-hover:scale-110 transition-all duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-sm">{t('footer.contact.address')}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className={`w-11 h-11 bg-slate-800 rounded-lg flex items-center justify-center ${social.color} hover:scale-110 hover:-translate-y-1 transition-all duration-300 animate-fade-in`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Columns - UPDATED HOVER COLORS */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Company Links */}
              <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <h4 className="text-lg font-bold mb-4 text-white">{t('footer.sections.company')}</h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      {link.href.startsWith('/') ? (
                        <Link 
                          href={link.href}
                          className="text-sm text-slate-400 hover:text-[#f2413b] hover:translate-x-1 inline-block transition-all duration-300 cursor-pointer"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <a 
                          href={link.href}
                          onClick={(e) => handleFooterLinkClick(e, link.href)}
                          className="text-sm text-slate-400 hover:text-[#f2413b] hover:translate-x-1 inline-block transition-all duration-300 cursor-pointer"
                        >
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* About Us Sections */}
              <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h4 className="text-lg font-bold mb-4 text-white">{t('footer.sections.about')}</h4>
                <ul className="space-y-3">
                  {footerLinks.about.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={`#${link.href}`}
                        onClick={(e) => handleAboutPageLinkClick(e, link.href)}
                        className="text-sm text-slate-400 hover:text-[#f2413b] hover:translate-x-1 inline-block transition-all duration-300 cursor-pointer"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Products Links */}
              <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <h4 className="text-lg font-bold mb-4 text-white">{t('footer.sections.products')}</h4>
                <ul className="space-y-3">
                  {footerLinks.products.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-[#f2413b] hover:translate-x-1 inline-block transition-all duration-300 cursor-pointer"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <h4 className="text-lg font-bold mb-4 text-white">{t('footer.sections.support')}</h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        onClick={(e) => handleFooterLinkClick(e, link.href)}
                        className="text-sm text-slate-400 hover:text-[#f2413b] hover:translate-x-1 inline-block transition-all duration-300 cursor-pointer"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out both;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }

        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </footer>
  );
}