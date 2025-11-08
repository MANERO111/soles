'use client';
import { useState, useEffect, useRef } from 'react';
import { Quote, Award, TrendingUp, Heart } from 'lucide-react';
import { useLanguage } from '@/app/contexts/languageContext';

function PresidentMessageSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  const highlights = [
    {
      icon: Award,
      title: t('president.highlights.leadership.title'),
      description: t('president.highlights.leadership.description'),
      color: 'from-[#f2413b] to-red-600'
    },
    {
      icon: TrendingUp,
      title: t('president.highlights.growth.title'),
      description: t('president.highlights.growth.description'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: t('president.highlights.commitment.title'),
      description: t('president.highlights.commitment.description'),
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-32 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      {/* Decorative Blobs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#f2413b]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border-2 border-white/10 rounded-full mb-6 shadow-lg backdrop-blur-sm">
            <Quote className="w-5 h-5 text-[#f2413b] animate-pulse" />
            <span className="text-sm text-white/90 font-semibold uppercase tracking-wider">
              {t('president.badge')}
            </span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-4">
            {t('president.title.line1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f2413b] to-red-400 animate-gradient">{t('president.title.line2')}</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-12 items-center mb-20">
          {/* Left Side - President Photo */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative group">
              {/* Photo Container */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-2 rounded-3xl border-2 border-white/20 backdrop-blur-sm shadow-2xl overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden relative">
                  {/* Placeholder for president photo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/img/LOT00008 copie.jpg" alt="worker pic" />
                  </div>
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  
                  {/* President info badge at bottom */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
                    <h3 className="text-xl font-bold text-white mb-1">{t('president.name')}</h3>
                    <p className="text-white/80 text-sm">{t('president.role')}</p>
                  </div>
                </div>

                {/* Decorative corners */}
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t-4 border-l-4 border-[#f2413b] rounded-tl-lg"></div>
                <div className="absolute -top-3 -right-3 w-6 h-6 border-t-4 border-r-4 border-[#f2413b] rounded-tr-lg"></div>
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-4 border-l-4 border-[#f2413b] rounded-bl-lg"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-4 border-r-4 border-[#f2413b] rounded-br-lg"></div>
              </div>

              {/* Floating accent */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#f2413b]/20 rounded-3xl blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
            </div>
          </div>

          {/* Right Side - Message */}
          <div className={`lg:col-span-3 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="space-y-6">
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#f2413b] to-red-600 rounded-2xl flex items-center justify-center shadow-xl animate-float">
                <Quote className="w-8 h-8 text-white" />
              </div>

              {/* Message Text */}
              <div className="space-y-4 text-white/90 text-lg leading-relaxed">
                <p className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  {t('president.message.paragraph1')}
                </p>
                <p className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                  {t('president.message.paragraph2')}
                </p>
                <p className="animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                  {t('president.message.paragraph3')}
                </p>
                <p className="animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
                  {t('president.message.paragraph4')}
                </p>
              </div>

              {/* Signature */}
              <div className="pt-6 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: '1.3s' }}>
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-[#f2413b] to-transparent"></div>
                  <p className="text-white font-semibold text-lg">{t('president.signature')}</p>
                  <div className="h-px flex-1 bg-gradient-to-l from-[#f2413b] to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Highlights */}
        <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div 
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{ 
                  animation: `fadeInUp 0.6s ease-out forwards`,
                  animationDelay: `${0.8 + index * 0.1}s`,
                  opacity: 0
                }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${highlight.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#f2413b] transition-colors">
                  {highlight.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {highlight.description}
                </p>
                
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#f2413b]/0 via-[#f2413b]/5 to-[#f2413b]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
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

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default PresidentMessageSection;