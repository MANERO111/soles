'use client';
import { useState, useEffect, useRef } from 'react';
import { Sparkles, Award, Users, Globe } from 'lucide-react';
import { useLanguage } from '@/app/contexts/languageContext';
import { useRouter, usePathname } from 'next/navigation';

function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [countUpValues, setCountUpValues] = useState({ years: 0, clients: 0, materials: 0, exports: 0 });
  const sectionRef = useRef(null);
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Trigger count-up animation
            animateCountUp();
          }
        });
      },
      { threshold: 0.2 }
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

  const animateCountUp = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCountUpValues({
        years: Math.floor(30 * progress),
        clients: Math.floor(1000 * progress),
        materials: Math.floor(8 * progress),
        exports: Math.floor(70 * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCountUpValues({ years: 30, clients: 1000, materials: 8, exports: 70 });
      }
    }, stepDuration);
  };
  const handleSectionNavigation = (sectionId: string) => {

      router.push(`aboutUs/#${sectionId}`);

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

  return (
    <div 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-slate-50 via-white to-amber-50/20 py-32 overflow-hidden"
      id="about"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      
      {/* Floating Decorative Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-40 right-20 w-80 h-80 bg-red-200 rounded-full blur-3xl opacity-25 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-slate-300 rounded-full blur-3xl opacity-15 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Badge & Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-50 to-red-50 border-2 border-amber-200/50 rounded-full mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Sparkles className="w-5 h-5 text-[#f2413b] animate-pulse" />
            <span className="text-sm text-slate-800 font-semibold uppercase tracking-wider">
              {t('aboutLegacy.badge')}
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6">
            {t('aboutLegacy.title.line1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f2413b] to-red-600 animate-gradient">
              {t('aboutLegacy.title.line2')}
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('aboutLegacy.subtitle')}
          </p>
        </div>

        {/* Main Content Grid - Reversed Layout */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center mb-20">
          {/* Right Content - Image Collage (Now on Left, 3 columns) */}
          <div className={`lg:col-span-3 relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative min-h-[600px]">
              {/* Grid Layout for Images */}
              <div className="grid grid-cols-2 gap-6">
                {/* Top Left - Large Image */}
                <div className="col-span-2 relative group">
                  <div className="relative bg-white p-3 rounded-3xl shadow-2xl overflow-hidden transform group-hover:-translate-y-2 group-hover:shadow-amber-300/50 transition-all duration-500">
                    <div className="aspect-[16/9] bg-gradient-to-br from-slate-100 to-amber-100 rounded-2xl overflow-hidden">
                      <img 
                        src="img/LOT00060 copie.jpg" 
                        alt={t('aboutLegacy.images.manufacturing')} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  </div>
                </div>

                {/* Bottom Left */}
                <div className="relative group">
                  <div className="relative bg-white p-3 rounded-3xl shadow-xl overflow-hidden transform group-hover:-translate-y-2 group-hover:rotate-2 transition-all duration-500">
                    <div className="aspect-square bg-gradient-to-br from-red-100 to-amber-100 rounded-2xl overflow-hidden">
                      <img 
                        src="img/LOT00010 copie.jpg" 
                        alt={t('aboutLegacy.images.craftsmanship')} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Right */}
                <div className="relative group">
                  <div className="relative bg-white p-3 rounded-3xl shadow-xl overflow-hidden transform group-hover:-translate-y-2 group-hover:-rotate-2 transition-all duration-500">
                    <div className="aspect-square bg-gradient-to-br from-amber-100 to-slate-100 rounded-2xl overflow-hidden">
                      <img 
                        src="img/LOT00008 copie.jpg" 
                        alt={t('aboutLegacy.images.quality')} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#f2413b] to-red-500 text-white px-6 py-3 rounded-full shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300 z-20">
                <div className="text-center">
                  <div className="text-2xl font-bold">30+</div>
                  <div className="text-xs uppercase tracking-wide">{t('aboutLegacy.years')}</div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-400 rounded-full blur-2xl opacity-60 animate-pulse"></div>
            </div>
          </div>

          {/* Left Content - Text (Now on Right, 2 columns) */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Story Content with Timeline Style */}
            <div className="space-y-8">
              {/* Timeline Item 1 */}
              <div className="relative pl-8 border-l-4 border-amber-300 hover:border-amber-500 transition-colors duration-300 group">
                <div className="absolute -left-3 top-0 w-5 h-5 bg-amber-500 rounded-full border-4 border-white shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                <div className="space-y-2">
                  <div className="text-sm font-bold text-amber-600 uppercase tracking-wider">
                    {t('aboutLegacy.timeline.1995.year')}
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {t('aboutLegacy.timeline.1995.description')}
                  </p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative pl-8 border-l-4 border-[#f5a08b] hover:border-[#f2603b] transition-colors duration-300 group">
                <div className="absolute -left-3 top-0 w-5 h-5 bg-[#f2603b] rounded-full border-4 border-white shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                <div className="space-y-2">
                  <div className="text-sm font-bold text-[#f2603b] uppercase tracking-wider">
                    {t('aboutLegacy.timeline.2020.year')}
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {t('aboutLegacy.timeline.2020.description')}
                  </p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative pl-8 border-l-4 border-[#f89a97] hover:border-[#f2413b] transition-colors duration-300 group">
                <div className="absolute -left-3 top-0 w-5 h-5 bg-[#f2413b] rounded-full border-4 border-white shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                <div className="space-y-2">
                  <div className="text-sm font-bold text-[#f2413b] uppercase tracking-wider">
                    {t('aboutLegacy.timeline.2022.year')}
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {t('aboutLegacy.timeline.2022.description')}
                  </p>
                </div>
              </div>

              {/* Timeline Item 4 */}
              <div className="relative pl-8 border-l-4 border-red-300 hover:border-red-500 transition-colors duration-300 group">
                <div className="absolute -left-3 top-0 w-5 h-5 bg-red-500 rounded-full border-4 border-white shadow-lg group-hover:scale-125 transition-transform duration-300 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="text-sm font-bold text-red-600 uppercase tracking-wider">
                    {t('aboutLegacy.timeline.today.year')}
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {t('aboutLegacy.timeline.today.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button onClick={() => handleSectionNavigation('our-journey')}  className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-[#f2603b] text-white rounded-xl font-semibold overflow-hidden hover:shadow-2xl hover:shadow-red-300/50 transition-all duration-300 hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                {t('aboutLegacy.cta')}
                <Award className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#f2563b] to-red-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>

        {/* Stats Grid - Modern Card Style */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-amber-200">
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <div className="text-5xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
              {countUpValues.years}+
            </div>
            <div className="text-slate-600 font-medium">{t('aboutLegacy.stats.years')}</div>
          </div>

          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-red-200">
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-5xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
              {countUpValues.clients}+
            </div>
            <div className="text-slate-600 font-medium">{t('aboutLegacy.stats.clients')}</div>
          </div>

          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-amber-200">
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-amber-600" />
            </div>
            <div className="text-5xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
              {countUpValues.materials}
            </div>
            <div className="text-slate-600 font-medium">{t('aboutLegacy.stats.materials')}</div>
          </div>

          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-red-200">
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-5xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
              {countUpValues.exports}%
            </div>
            <div className="text-slate-600 font-medium">{t('aboutLegacy.stats.exports')}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes grid-flow {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 80px 80px;
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default AboutSection;