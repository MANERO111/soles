'use client';
import { useState, useEffect, useRef } from 'react';
import { Briefcase, Lightbulb, Rocket, Shield, Target, Zap } from 'lucide-react';
import { useLanguage } from '@/app/contexts/languageContext';
import { useRouter, usePathname } from 'next/navigation';

function ValuesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const sectionRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
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

  const values = [
    {
      icon: Briefcase,
      title: t('values.items.expertise.title'),
      description: t('values.items.expertise.description'),
      color: "from-red-500 to-orange-500",
      bgColor: "from-red-50 to-orange-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      accentColor: "border-red-200",
      badge: t('values.items.expertise.badge')
    },
    {
      icon: Lightbulb,
      title: t('values.items.innovation.title'),
      description: t('values.items.innovation.description'),
      color: "from-amber-500 to-yellow-500",
      bgColor: "from-amber-50 to-yellow-50",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      accentColor: "border-amber-200",
      badge: t('values.items.innovation.badge')
    },
    {
      icon: Rocket,
      title: t('values.items.flexibility.title'),
      description: t('values.items.flexibility.description'),
      color: "from-slate-600 to-slate-800",
      bgColor: "from-slate-50 to-gray-50",
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
      accentColor: "border-slate-200",
      badge: t('values.items.flexibility.badge')
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-white via-slate-50/100 to-amber-50/20 py-32 overflow-hidden"
    >

        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_60%,rgba(239,68,68,0.1),transparent_50%)]"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border-4 border-amber-200 rounded-lg rotate-45 animate-float opacity-30"></div>
      <div className="absolute bottom-40 right-20 w-16 h-16 border-4 border-red-200 rounded-full animate-float-delayed opacity-30"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-slate-200 rounded-full animate-pulse opacity-20"></div>

      <div id='values' className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="relative inline-block">
            <h2 className="text-7xl sm:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-amber-100 to-slate-200 leading-tight tracking-tight">
              {t('values.title')}
            </h2>
            <div className="absolute inset-0 text-7xl sm:text-8xl lg:text-9xl font-black text-slate-900 leading-tight tracking-tight opacity-10 blur-sm">
              {t('values.title')}
            </div>
          </div>
          <div className="mt-4 h-2 w-32 bg-gradient-to-r from-red-500 via-amber-500 to-slate-600 rounded-full animate-pulse"></div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            const isActive = activeCard === index;
            
            return (
              <div
                key={index}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className={`group relative transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Card Container */}
                <div className={`relative h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${value.accentColor} overflow-hidden ${
                  isActive ? 'scale-105 -translate-y-4' : 'scale-100'
                }`}>
                  
                  {/* Gradient Background Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Animated Corner Accent */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${value.color} opacity-10 rounded-full blur-3xl transform translate-x-20 -translate-y-20 group-hover:translate-x-10 group-hover:-translate-y-10 transition-transform duration-700`}></div>

                  {/* Content */}
                  <div className="relative z-10 space-y-6">
                    {/* Icon Container */}
                    <div className="relative">
                      <div className={`w-20 h-20 ${value.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                        <Icon className={`w-10 h-10 ${value.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      
                      {/* Animated ring effect */}
                      <div className={`absolute inset-0 w-20 h-20 rounded-2xl border-4 ${value.accentColor} opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`}></div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:via-amber-600 group-hover:to-slate-900 transition-all duration-300">
                      {value.title}
                    </h3>

                    {/* Divider Line */}
                    <div className={`h-1 w-16 bg-gradient-to-r ${value.color} rounded-full group-hover:w-full transition-all duration-500`}></div>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                      {value.description}
                    </p>

                    {/* Read More Link */}
                    <div className="pt-4">
                      <button className={`inline-flex items-center gap-2 text-sm font-semibold ${value.iconColor} opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300`}>
                        {t('values.cta.learnMore')}
                        <Zap className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>

                {/* Floating badge for emphasis */}
                {index === 0 && (
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 z-20">
                    {value.badge}
                  </div>
                )}
                {index === 1 && (
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 z-20">
                    {value.badge}
                  </div>
                )}
                {index === 2 && (
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-slate-600 to-slate-800 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 z-20">
                    {value.badge}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button onClick={() => handleSectionNavigation('about')} className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-[#f2603b] text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:shadow-red-300/50 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                {t('values.cta.exploreProcess')}
                <Target className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#f2563b] to-red-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
            
            <button onClick={() => handleSectionNavigation('contact')} className="px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-xl font-semibold hover:bg-slate-900 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg">
              {t('values.cta.contactTeam')}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(45deg);
          }
          50% {
            transform: translateY(-20px) rotate(45deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}

export default ValuesSection;