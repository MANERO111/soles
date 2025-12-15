"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/app/contexts/languageContext';
import Image from 'next/image';

function HeroSection() {
  const [isClient, setIsClient] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [logoInCenter, setLogoInCenter] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef(null);
  const videoContainerRef = useRef(null);
  const { t, locale } = useLanguage();

  // Client-side rendering check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Video dimensions and opacity with smoother transitions
  const videoWidth = fadeOut ? '85%' : '100%';
  const videoHeight = fadeOut ? '85%' : '100%';
  const videoOpacity = fadeOut ? 0 : 1;
  const videoBorderRadius = fadeOut ? '24px' : '0px';
  const videoScale = fadeOut ? 0.95 : 1;

  const handleSectionNavigation = (sectionId: string) => {
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
    };

  // Time update handler
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;

      if (!isNaN(duration) && !isNaN(currentTime)) {
        const timeLeft = duration - currentTime;

        if (timeLeft < 1.8 && !videoEnded) {
          videoRef.current.pause();
          setVideoEnded(true);
          
          // Staggered animations for smooth transition
          setTimeout(() => setFadeOut(true), 100);
          setTimeout(() => setContentVisible(true), 800);
        }
      }
    }
  };

  // Handle video end
  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.duration - 0.01;
      videoRef.current.pause();
    }
    setVideoEnded(true);
    setTimeout(() => setFadeOut(true), 100);
    setTimeout(() => setContentVisible(true), 800);
  };

  // Video autoplay with increased speed
  useEffect(() => {
    if (isClient && videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, [isClient]);

  // Logo animation timing
  useEffect(() => {
    if (isClient) {
      const timer = setTimeout(() => {
        setLogoInCenter(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isClient]);

  // Intersection observer for video playback
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (videoRef.current && !videoEnded) {
            videoRef.current.play().catch(e => console.log('Autoplay prevented', e));
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [videoEnded]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Background - appears after video ends with smooth fade */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 transition-opacity duration-[2000ms] ease-in-out"
        style={{
          opacity: fadeOut ? 1 : 0,
        }}
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        {/* Decorative Elements with delayed appearance */}
        <div 
          className="absolute top-20 right-10 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            opacity: contentVisible ? 0.3 : 0,
            transitionDelay: '400ms'
          }}
        ></div>
        <div 
          className="absolute bottom-20 left-10 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-0 transition-opacity duration-[1500ms] ease-out"
          style={{
            opacity: contentVisible ? 0.2 : 0,
            transitionDelay: '600ms'
          }}
        ></div>
      </div>

      {/* Video Background Container with perfect centering */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 flex justify-center items-center z-0"
      >
        {isClient && (
          <video
            ref={videoRef}
            className="object-cover object-center"
            style={{
              width: videoWidth,
              height: videoHeight,
              opacity: videoOpacity,
              borderRadius: videoBorderRadius,
              transform: `scale(${videoScale})`,
              transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: fadeOut ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "none"
            }}
            autoPlay
            muted
            webkit-playsinline="true" 
            preload="metadata"  
            playsInline={true}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnd}
          >
            <source src="/video/Casa-Seumelle-compressed.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Content with staggered animations */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-40 z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div 
            className="space-y-6 sm:space-y-8"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1) 200ms',
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#f2413b] rounded-full shadow-sm">
              <span className="w-2 h-2 bg-[#f2413b] rounded-full animate-pulse"></span>
              <span className="text-sm text-[#f2413b] font-medium">{t('hero.badge')}</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
                {t('hero.titleLine1')}
                <span className="block text-[#f2413b] mt-2">{t('hero.titleLine2')}</span>
                {t('hero.titleLine3')}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed">
                {t('hero.description')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <a href="/products">
              <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white rounded-md font-medium hover:bg-amber-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                {t('hero.ctaPrimary')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              </a>
              <button onClick={() => handleSectionNavigation('contact')} className="px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-md font-medium hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
                {t('hero.ctaSecondary')}
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-slate-200">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900">70%</div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1">{t('hero.stats.export')}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900">1000+</div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1">{t('hero.stats.clients')}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900">8 {t('common.materials')}</div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1">{t('hero.stats.materials')}</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div 
            className="relative"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
              transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1) 400ms',
            }}
          >
            {/* Main Card */}
            <div className="relative z-10 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <div className="space-y-6">
                {/* Product Preview */}
                <div className="aspect-square bg-gradient-to-br from-slate-50 to-amber-50 rounded-xl flex items-center justify-center relative overflow-hidden group border border-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-amber-100/30 group-hover:from-amber-50/20 group-hover:to-amber-100/40 transition-all duration-500"></div>
                  <div className="relative w-full h-full z-10 transform group-hover:scale-110 transition-transform duration-500">
                    <Image 
                      src="/img/15.png" 
                      alt="Product Preview" 
                      fill
                      className="object-contain p-4"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Corner Accent with delayed animation */}
            <div 
              className="absolute -top-4 -right-4 w-24 h-24 bg-amber-200 rounded-full blur-2xl opacity-0 transition-opacity duration-1000"
              style={{
                opacity: contentVisible ? 0.4 : 0,
                transitionDelay: '600ms'
              }}
            ></div>
            <div 
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-slate-300 rounded-full blur-2xl opacity-0 transition-opacity duration-1000"
              style={{
                opacity: contentVisible ? 0.3 : 0,
                transitionDelay: '800ms'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Animated Logo with smooth transitions */}
      <motion.div
        className="absolute z-20 left-1/2"
        style={{
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        initial={false}
        animate={{
          scale: logoInCenter ? 2.5 : 1,
          bottom: logoInCenter ? '50%' : '10%',
          translateY: logoInCenter ? '50%' : '0%',
          translateX: '-50%'
        }}
        transition={{
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <div className="relative h-32 sm:h-44 w-[400px]">
          <Image 
            src="/img/casaSemelle.png" 
            alt="casaSemelle logo" 
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Scroll Indicator - only show after content visible */}
      <div 
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        style={{
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translate(-50%, 0)' : 'translate(-50%, 20px)',
          transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1) 1000ms',
        }}
      >
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center animate-bounce">
          <div className="w-1.5 h-3 bg-[#f2413b] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;