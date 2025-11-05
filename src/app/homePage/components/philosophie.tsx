'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Sparkles, Heart, Wrench, Users } from 'lucide-react';
import { useLanguage } from '@/app/contexts/languageContext';
import { useRouter, usePathname } from 'next/navigation';

function PhilosophySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  // Generate particles once with useMemo to prevent hydration mismatch
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10
    }));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
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
  }, []);

  const handleMouseMove = (e : React.MouseEvent) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    }
  };
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

  return (
    <div 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-24 lg:py-32 overflow-hidden"
      id='philosophie'
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] sm:bg-[size:75px_75px] lg:bg-[size:100px_100px] animate-grid-scroll"></div>
      
      {/* Glowing Orbs - Responsive sizing and positioning */}
      <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-amber-500 rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-red-500 rounded-full blur-3xl opacity-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-slate-500 rounded-full blur-3xl opacity-5 animate-float"></div>

      {/* Floating Particles - Fixed hydration issue */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-amber-400 rounded-full animate-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          ></div>
        ))}
      </div>

      <div id='philosophy' className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Badge */}
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-500/20 to-red-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-pulse" />
            <span className="text-xs sm:text-sm text-amber-200 font-semibold uppercase tracking-widest">
              {t('philosophy.badge')}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Side - Image with Interactive Elements */}
          <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div 
              ref={imageRef}
              onMouseMove={handleMouseMove}
              className="relative group cursor-pointer"
            >
              {/* Main Image Container with Morph Effect */}
              <div className="relative aspect-square overflow-hidden rounded-[40px] sm:rounded-[50px] lg:rounded-[60px] rotate-3 sm:rotate-6 group-hover:rotate-0 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-white to-slate-200 animate-morph">
                  {/* Placeholder for actual image */}
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <div className="relative w-full h-full bg-gradient-to-br from-slate-100 to-amber-100 overflow-hidden">
                      <img 
                        src="/img/LOT00006 copie.jpg" 
                        alt={t('philosophy.images.craftsmanship')}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                    </div>
                  </div>
                </div>

                {/* Interactive Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(251, 57, 36, 0.3) 0%, transparent 50%)`
                  }}
                ></div>
              </div>

              {/* Floating Decorative Circles - Responsive sizing */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#f2413b] to-[#f23b3b] rounded-full opacity-80 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500 shadow-2xl shadow-amber-500/50 flex items-center justify-center">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white animate-pulse" />
              </div>
              
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full opacity-90 group-hover:scale-125 group-hover:translate-y-2 transition-all duration-500 shadow-2xl shadow-slate-900/50 flex items-center justify-center">
                <Wrench className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#f2413b] animate-spin-slow" />
              </div>

              <div className="absolute top-1/2 -right-3 sm:-right-4 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full opacity-70 group-hover:scale-125 group-hover:translate-x-2 transition-all duration-500 shadow-2xl shadow-red-500/50 animate-bounce-slow flex items-center justify-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </div>

              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-[40px] sm:rounded-[50px] lg:rounded-[60px] blur-2xl transform scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>

            {/* Background decoration */}
            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-amber-500/10 to-red-500/10 rounded-[40px] sm:rounded-[50px] lg:rounded-[60px] blur-3xl transform scale-110 animate-pulse-slow"></div>
          </div>

          {/* Right Side - Content */}
          <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            {/* Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-4 sm:mb-6">
                {t('philosophy.title.line1')}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#f2413b] via-[#f2663b] to-[#f2413b] animate-shimmer">
                  {t('philosophy.title.line2')}
                </span>
              </h2>
            </div>

            {/* Description Paragraphs */}
            <div className="space-y-4 sm:space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed">
              <p className="group hover:text-white transition-colors duration-300">
                {t('philosophy.description.paragraph1')}
              </p>
              
              <div className="relative pl-4 sm:pl-6 border-l-2 sm:border-l-4 border-amber-500/50 hover:border-amber-500 transition-colors duration-300">
                <p>
                  {t('philosophy.description.paragraph2')}
                </p>
              </div>

              <p className="group hover:text-white transition-colors duration-300">
                {t('philosophy.description.paragraph3')}
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4">
              <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-xs sm:text-sm font-medium hover:bg-amber-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                {t('philosophy.features.custom')}
              </div>
              <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500/20 border border-red-500/40 rounded-full text-red-300 text-xs sm:text-sm font-medium hover:bg-red-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                {t('philosophy.features.quality')}
              </div>
              <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-500/20 border border-slate-500/40 rounded-full text-slate-300 text-xs sm:text-sm font-medium hover:bg-slate-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                {t('philosophy.features.delivery')}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 sm:pt-6">
              <button onClick={() => handleSectionNavigation('contact')}  className="group relative w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#f2413b] to-[#f2753b] text-white rounded-xl font-bold text-base sm:text-lg shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/80 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  {t('philosophy.cta')}
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-scroll {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100px 100px;
          }
        }

        @keyframes morph {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes particle {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.05);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-grid-scroll {
          animation: grid-scroll 20s linear infinite;
        }

        .animate-morph {
          animation: morph 8s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-particle {
          animation: particle linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default PhilosophySection;