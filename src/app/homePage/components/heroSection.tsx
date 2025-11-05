"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/app/contexts/languageContext'; // Change this import

function HeroSection() {
  const [isClient, setIsClient] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [logoInCenter, setLogoInCenter] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef(null);
  const videoContainerRef = useRef(null);
  const { t, locale } = useLanguage(); // Change this line

  // Client-side rendering check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Remove the HTML lang update effect since it's handled in the context
  // Video dimensions and opacity
  const videoWidth = fadeOut ? '80%' : '100%';
  const videoOpacity = fadeOut ? 0 : 1;
  const videoBorderRadius = fadeOut ? '20px' : '0px';

  // Time update handler
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;

      if (!isNaN(duration) && !isNaN(currentTime)) {
        const timeLeft = duration - currentTime;

        if (timeLeft < 1.5 && !videoEnded) {
          videoRef.current.pause();
          setVideoEnded(true);
          setFadeOut(true);
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
    setFadeOut(true);
  };

  // Video autoplay with increased speed
  useEffect(() => {
    if (isClient && videoRef.current) {
      const timer = setTimeout(() => {
        try {
          if (videoRef.current) {
            // Increase video playback speed to 1.5x
            videoRef.current.playbackRate = 1.5;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                console.error("Autoplay prevented:", error);
                setVideoEnded(true);
                setFadeOut(true);
              });
            }
          }
        } catch (error) {
          console.error("Video play error:", error);
          setVideoEnded(true);
          setFadeOut(true);
        }
      }, 100);

      return () => clearTimeout(timer);
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
            videoRef.current.play();
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
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background - appears after video ends */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100"
        style={{
          opacity: fadeOut ? 1 : 0,
          transitionProperty: 'opacity',
          transitionDuration: '2s',
          transitionTimingFunction: 'ease-in-out',
        }}
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Video Background Container */}
      <motion.div
        ref={videoContainerRef}
        className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-0"
      >
        {isClient && (
          <motion.video
            ref={videoRef}
            className="object-cover object-center z-0"
            style={{
              width: videoWidth,
              height: "100%",
              opacity: videoOpacity,
              borderRadius: videoBorderRadius,
              transitionProperty: 'opacity, border-radius',
              transitionDuration: '2s',
              transitionTimingFunction: 'ease-in-out',
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
            }}
            autoPlay
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnd}
          >
            <source src="vedio/Casa-Seumelle-compressed.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        )}
      </motion.div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div 
            className="space-y-8"
            style={{
              opacity: fadeOut ? 1 : 0,
              transform: fadeOut ? 'translateY(0)' : 'translateY(20px)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '1s',
              transitionDelay: '0.5s',
              transitionTimingFunction: 'ease-out',
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#f2413b] rounded-full">
              <span className="w-2 h-2 bg-[#f2413b] rounded-full"></span>
              <span className="text-sm text-[#f2413b] font-medium">{t('hero.badge')}</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
                {t('hero.titleLine1')}
                <span className="block text-[#f2413b]">{t('hero.titleLine2')}</span>
                {t('hero.titleLine3')}
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
                {t('hero.description')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group px-8 py-4 bg-slate-900 text-white rounded-md font-medium hover:bg-amber-600 transition-all duration-300 flex items-center gap-2">
                {t('hero.ctaPrimary')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-md font-medium hover:bg-slate-900 hover:text-white transition-all duration-300">
                {t('hero.ctaSecondary')}
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-slate-200">
              <div>
                <div className="text-3xl font-bold text-slate-900">70%</div>
                <div className="text-sm text-slate-600 mt-1">{t('hero.stats.export')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">1000+</div>
                <div className="text-sm text-slate-600 mt-1">{t('hero.stats.clients')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">8 {t('common.materials')}</div>
                <div className="text-sm text-slate-600 mt-1">{t('hero.stats.materials')}</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div 
            className="relative"
            style={{
              opacity: fadeOut ? 1 : 0,
              transform: fadeOut ? 'translateY(0)' : 'translateY(20px)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '1s',
              transitionDelay: '0.7s',
              transitionTimingFunction: 'ease-out',
            }}
          >
            {/* Main Card */}
            <div className="relative z-10 bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
              <div className="space-y-6">
                {/* Product Preview */}
                <div className="aspect-square bg-gradient-to-br from-slate-50 to-amber-50 rounded-xl flex items-center justify-center relative overflow-hidden group border border-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-amber-100/30 group-hover:from-amber-50/20 group-hover:to-amber-100/40 transition-all duration-500"></div>
                  <div className="text-8xl relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                    <img src="img/15.png" alt="Product Preview" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Corner Accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-200 rounded-full blur-2xl opacity-40"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-slate-300 rounded-full blur-2xl opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Animated Logo */}
      <motion.div
        className="absolute z-20 left-1/2"
        style={{
          opacity: fadeOut ? 0 : 1,
          transitionProperty: 'opacity',
          transitionDuration: '1s',
        }}
        initial={false}
        animate={{
          scale: logoInCenter ? 2.5 : 1,
          bottom: logoInCenter ? '50%' : '10%',
          translateY: logoInCenter ? '50%' : '0%',
          translateX: '-50%'
        }}
        transition={{
          duration: 1,
          ease: "easeInOut"
        }}
      >
        <img src="img/casaSemelle.png" alt="casaSemelle logo" className="h-44" />
      </motion.div>

      {/* Scroll Indicator - only show after video ends */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
        style={{
          opacity: fadeOut ? 1 : 0,
          transitionProperty: 'opacity',
          transitionDuration: '1s',
          transitionDelay: '1s',
        }}
      >
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-[#f2413b] rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;