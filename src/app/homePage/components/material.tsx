'use client';
import { useState, useEffect, useRef } from 'react';
import { Layers, Zap, Shield, Sparkles, CheckCircle, ArrowRight, Camera } from 'lucide-react';
import { useLanguage } from '@/app/contexts/languageContext';
import { useRouter, usePathname } from 'next/navigation';
function MaterialsTechnologySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();
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
  const materials = [
    {
      name: t('materials.tr.name'),
      description: t('materials.tr.description'),
      features: [
        t('materials.tr.features.feature1'),
        t('materials.tr.features.feature2'),
        t('materials.tr.features.feature3'),
        t('materials.tr.features.feature4')
      ],
      applications: t('materials.tr.applications'),
      icon: '🔥',
      color: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-300 hover:border-orange-500'
    },
    {
      name: t('materials.tpu.name'),
      description: t('materials.tpu.description'),
      features: [
        t('materials.tpu.features.feature1'),
        t('materials.tpu.features.feature2'),
        t('materials.tpu.features.feature3'),
        t('materials.tpu.features.feature4')
      ],
      applications: t('materials.tpu.applications'),
      icon: '⚙️',
      color: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-300 hover:border-purple-500'
    },
    {
      name: t('materials.eva.name'),
      description: t('materials.eva.description'),
      features: [
        t('materials.eva.features.feature1'),
        t('materials.eva.features.feature2'),
        t('materials.eva.features.feature3'),
        t('materials.eva.features.feature4')
      ],
      applications: t('materials.eva.applications'),
      icon: '⚡',
      color: 'from-[#f2413b] to-red-600',
      bgGradient: 'from-red-50 to-orange-50',
      borderColor: 'border-[#f2413b]/20 hover:border-[#f2413b]'
    },
    {
      name: t('materials.pu.name'),
      description: t('materials.pu.description'),
      features: [
        t('materials.pu.features.feature1'),
        t('materials.pu.features.feature2'),
        t('materials.pu.features.feature3'),
        t('materials.pu.features.feature4')
      ],
      applications: t('materials.pu.applications'),
      icon: '💎',
      color: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-300 hover:border-blue-500'
    },
    {
      name: t('materials.pvc.name'),
      description: t('materials.pvc.description'),
      features: [
        t('materials.pvc.features.feature1'),
        t('materials.pvc.features.feature2'),
        t('materials.pvc.features.feature3'),
        t('materials.pvc.features.feature4')
      ],
      applications: t('materials.pvc.applications'),
      icon: '🔧',
      color: 'from-teal-500 to-emerald-600',
      bgGradient: 'from-teal-50 to-emerald-50',
      borderColor: 'border-teal-300 hover:border-teal-500'
    },
    {
      name: t('materials.rubber.name'),
      description: t('materials.rubber.description'),
      features: [
        t('materials.rubber.features.feature1'),
        t('materials.rubber.features.feature2'),
        t('materials.rubber.features.feature3')
      ],
      applications: t('materials.rubber.applications'),
      icon: '🛡️',
      color: 'from-slate-600 to-slate-800',
      bgGradient: 'from-slate-50 to-gray-50',
      borderColor: 'border-slate-300 hover:border-slate-600'
    },
    {
      name: t('materials.leather.name'),
      description: t('materials.leather.description'),
      features: [
        t('materials.leather.features.feature1'),
        t('materials.leather.features.feature2'),
        t('materials.leather.features.feature3')
      ],
      applications: t('materials.leather.applications'),
      icon: '🌿',
      color: 'from-amber-600 to-amber-800',
      bgGradient: 'from-amber-50 to-yellow-50',
      borderColor: 'border-amber-300 hover:border-amber-600'
    },
    {
      name: t('materials.prefabricated.name'),
      description: t('materials.prefabricated.description'),
      features: [
        t('materials.prefabricated.features.feature1'),
        t('materials.prefabricated.features.feature2'),
        t('materials.prefabricated.features.feature3')
      ],
      applications: t('materials.prefabricated.applications'),
      icon: '✨',
      color: 'from-indigo-500 to-purple-600',
      bgGradient: 'from-indigo-50 to-purple-50',
      borderColor: 'border-indigo-300 hover:border-indigo-500'
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-white via-slate-50 to-white py-32 overflow-hidden"
      id="materials"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      {/* Animated Background Blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#f2413b]/10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-40 left-20 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-[#f2413b]/30 rounded-full mb-6 shadow-lg">
            <Layers className="w-5 h-5 text-[#f2413b] animate-pulse" />
            <span className="text-sm text-slate-800 font-semibold uppercase tracking-wider">
              {t('materials.badge')}
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6">
            {t('materials.title.line1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f2413b] to-red-600 animate-gradient">
              {t('materials.title.line2')}
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('materials.subtitle')}
          </p>
        </div>

        {/* Image Gallery Section */}
        <div className={`grid md:grid-cols-2 gap-8 mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Image 1 - Manufacturing Process */}
          <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-[#f2413b]/30 transition-all duration-700 hover:-translate-y-3">
            <div className="aspect-video relative overflow-hidden bg-slate-900">
              {/* Image */}
              <img 
                src="/img/DSC03648 copie.jpg" 
                alt="Advanced Manufacturing Process" 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
              />
              
              {/* Gradient Overlay - Always visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              
              {/* Animated Border Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 border-4 border-[#f2413b] rounded-3xl animate-pulse-border"></div>
              </div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              {/* Title - Always visible at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-500">
                <div className="flex items-center gap-3 mb-2 transform transition-all duration-500 group-hover:translate-x-2">
                  <div className="w-12 h-12 bg-[#f2413b] rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white text-xl font-bold">Advanced Manufacturing</h3>
                </div>
                <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  State-of-the-art machinery and precision techniques ensure consistent quality across all material types
                </p>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-4 right-4 w-20 h-20 border-t-4 border-r-4 border-[#f2413b] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"></div>
            </div>
          </div>

          {/* Image 2 - Material Samples */}
          <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-700 hover:-translate-y-3">
            <div className="aspect-video relative overflow-hidden bg-blue-900">
              {/* Image */}
              <img 
                src="/img/DSC03646 copie.jpg" 
                alt="Premium Material Selection" 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
              />
              
              {/* Gradient Overlay - Always visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent"></div>
              
              {/* Animated Border Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 border-4 border-cyan-400 rounded-3xl animate-pulse-border"></div>
              </div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              {/* Title - Always visible at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-500">
                <div className="flex items-center gap-3 mb-2 transform transition-all duration-500 group-hover:translate-x-2">
                  <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white text-xl font-bold">Premium Materials</h3>
                </div>
                <p className="text-blue-200 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  From EVA to TPU, each material is carefully selected for optimal performance with a wide range of textures and colors
                </p>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-4 right-4 w-20 h-20 border-t-4 border-r-4 border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"></div>
            </div>
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {materials.map((material, index) => (
                <div
                key={index}
                className={`group relative bg-white border-2 ${material.borderColor} rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                    transitionDelay: `${index * 100}ms`,
                    animationDelay: `${index * 100}ms`
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${material.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative p-8 space-y-4">
                {/* Icon */}
                <div className="relative">
                  <div className={`w-20 h-20 bg-gradient-to-br ${material.color} rounded-2xl flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {material.icon}
                  </div>
                  
                  {/* Pulse effect on hover */}
                  {hoveredIndex === index && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${material.color} rounded-2xl animate-ping opacity-75`}></div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#f2413b] transition-colors duration-300">
                  {material.name}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed text-sm">
                  {material.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">Key Advantages:</h4>
                  {material.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Applications */}
                {material.applications && (
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Applications:</h4>
                    <p className="text-sm text-slate-600 italic">{material.applications}</p>
                  </div>
                )}

                {/* Hover Overlay Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${material.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom Stats / Info Section */}
        <div className={`bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 shadow-2xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Stat 1 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#f2413b] to-red-600 rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">8+</div>
              <div className="text-slate-400">{t('materials.stats.materials')}</div>
            </div>

            {/* Stat 2 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-slate-400">{t('materials.stats.quality')}</div>
            </div>

            {/* Stat 3 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">#1</div>
              <div className="text-slate-400">{t('materials.stats.market')}</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 pt-8 border-t border-white/10">
            <p className="text-white text-lg mb-6">{t('materials.cta.text')}</p>
            <button onClick={() => handleSectionNavigation('contact')} className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#f2413b] to-red-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#f2413b]/50 transition-all duration-300 hover:scale-105 active:scale-95">
              {t('materials.cta.button')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
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

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse-border {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.98);
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

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default MaterialsTechnologySection;