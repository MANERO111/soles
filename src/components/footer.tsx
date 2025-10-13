'use client';
import React, { useState } from 'react';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Heart,
  ExternalLink
} from 'lucide-react';

export default function Footer() {

  const footerLinks = {
    company: [
      { name: 'Home', href: '#home' },
      { name: 'About Us', href: '#about' },
      { name: 'Our Values', href: '#values' },
      { name: 'Our Philosophy', href: '#philosophy' },
      { name: 'Contact', href: '#contact' }
    ],
    products: [
      { name: 'Our Products', href: '#products' },
      { name: 'EVA Soles', href: '#eva' },
      { name: 'Microporous', href: '#microporous' },
      { name: 'Rubber Soles', href: '#rubber' },
      { name: 'Cork Soles', href: '#cork' }
    ],
    support: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'FAQ', href: '#faq' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' }
  ];



  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="relative">

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Brand Column */}
            <div className="lg:col-span-4 animate-slide-in-left">
              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-3">
                  Sole<span className="text-amber-500">Tech</span>
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Crafting premium shoe soles with 70 years of expertise. Where tradition meets innovation in every step.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <a href="tel:+391234567890" className="flex items-center gap-3 text-slate-400 hover:text-amber-500 transition-colors group">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-sm">+39 123 456 7890</span>
                </a>
                <a href="mailto:info@soletech.com" className="flex items-center gap-3 text-slate-400 hover:text-amber-500 transition-colors group">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-sm">info@soletech.com</span>
                </a>
                <div className="flex items-start gap-3 text-slate-400 group">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-sm">Via Example 123,<br />12345 City, Italy</span>
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

            {/* Links Columns */}
            <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Company Links */}
              <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <h4 className="text-lg font-bold mb-4 text-white">Company</h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-amber-500 hover:translate-x-1 inline-block transition-all duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Products Links */}
              <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h4 className="text-lg font-bold mb-4 text-white">Products</h4>
                <ul className="space-y-3">
                  {footerLinks.products.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-amber-500 hover:translate-x-1 inline-block transition-all duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <h4 className="text-lg font-bold mb-4 text-white">Support</h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-amber-500 hover:translate-x-1 inline-block transition-all duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <h4 className="text-lg font-bold mb-4 text-white">Legal</h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-amber-500 hover:translate-x-1 inline-block transition-all duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Column */}

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-400 text-center md:text-left">
                © 2025 SoleTech. All rights reserved. Made with{' '}
                <Heart className="inline w-4 h-4 text-red-500 fill-current animate-pulse" />{' '}
                in Italy
              </p>
              
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-1">
                  Quality Certified
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href="#" className="text-sm text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-1">
                  ISO 9001
                  <ExternalLink className="w-3 h-3" />
                </a>
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

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
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

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
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