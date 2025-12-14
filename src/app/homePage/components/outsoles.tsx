'use client';
import { useState, useEffect, useRef } from 'react';
import { Package, CheckCircle, Star, Users, Zap, Layers, ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '@/app/contexts/languageContext';
import Image from 'next/image';

function PrefabricatedOutsolesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeModel, setActiveModel] = useState(0);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
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

  // Auto-rotate models
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModel((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const models = [
    {
      title: t('prefabricated.models.mens.title'),
      features: [
        t('prefabricated.models.mens.feature1'),
        t('prefabricated.models.mens.feature2'),
        t('prefabricated.models.mens.feature3'),
        // t('prefabricated.models.mens.feature4')
      ],
      icon: '👞',
      image: '/img/DSC03627 copie.jpg',
      color: 'from-slate-700 to-slate-900',
      accentColor: 'border-slate-600'
    },
    {
      title: t('prefabricated.models.womens.title'),
      features: [
        t('prefabricated.models.womens.feature1'),
        t('prefabricated.models.womens.feature2'),
        t('prefabricated.models.womens.feature3')
      ],
      icon: '👠',
      image: '/img/DSC03650 copie.jpg',
      color: 'from-pink-500 to-rose-600',
      accentColor: 'border-pink-500'
    },
    {
      title: t('prefabricated.models.pointed.title'),
      features: [
        t('prefabricated.models.pointed.feature1'),
        t('prefabricated.models.pointed.feature2'),
        t('prefabricated.models.pointed.feature3')
      ],
      icon: '✨',
      image: '/img/DSC03630 copie.jpg',
      color: 'from-purple-500 to-indigo-600',
      accentColor: 'border-purple-500'
    }
  ];

  const craftsmanship = [
    {
      icon: <Layers className="w-6 h-6" />,
      title: t('prefabricated.craftsmanship.inventory.title'),
      description: t('prefabricated.craftsmanship.inventory.description')
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('prefabricated.craftsmanship.production.title'),
      items: [
        t('prefabricated.craftsmanship.production.item1'),
        t('prefabricated.craftsmanship.production.item2'),
        t('prefabricated.craftsmanship.production.item3'),
        t('prefabricated.craftsmanship.production.item4'),
        t('prefabricated.craftsmanship.production.item5')
      ]
    }
  ];

  const benefits = [
    t('prefabricated.benefits.benefit1'),
    t('prefabricated.benefits.benefit2'),
    t('prefabricated.benefits.benefit3'),
    t('prefabricated.benefits.benefit4'),
    t('prefabricated.benefits.benefit5')
  ];

  return (
    <div 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 py-32 overflow-hidden"
      id="prefabricated"
    >

        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95 z-10"></div>
  

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-[#f2413b]/30 rounded-full mb-6 shadow-lg">
            <Package className="w-5 h-5 text-[#f2413b] animate-pulse" />
            <span className="text-sm text-slate-800 font-semibold uppercase tracking-wider">
              {t('prefabricated.badge')}
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6">
            {t('prefabricated.title.line1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f2413b] to-red-600 animate-gradient">
              {t('prefabricated.title.line2')}
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {t('prefabricated.subtitle')}
          </p>
        </div>

        {/* Sample Models Showcase */}
        <div className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">{t('prefabricated.models.heading')}</h3>
            <p className="text-slate-600">{t('prefabricated.models.subheading')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {models.map((model, index) => (
              <div
                key={index}
                className={`group relative bg-white border-2 ${model.accentColor} rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${
                  activeModel === index ? 'ring-4 ring-[#f2413b] ring-offset-4' : ''
                }`}
                onClick={() => setActiveModel(index)}
                style={{ 
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <Image 
                    src={model.image} 
                    alt={model.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Gradient Overlay on Image */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${model.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>

                  {/* Icon Badge on Image */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${model.color} rounded-2xl flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border-2 border-white`}>
                      {model.icon}
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {activeModel === index && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="relative">
                        <div className="w-4 h-4 bg-[#f2413b] rounded-full"></div>
                        <div className="absolute inset-0 w-4 h-4 bg-[#f2413b] rounded-full animate-ping"></div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="relative p-8 bg-white">
                  {/* Title */}
                  <h4 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-[#f2413b] transition-colors duration-300">
                    {model.title}
                  </h4>

                  {/* Features */}
                  <ul className="space-y-3">
                    {model.features.map((feature, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-3 text-sm text-slate-700 transform transition-all duration-300"
                        style={{
                          transitionDelay: `${idx * 50}ms`
                        }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Hover Accent Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${model.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Craftsmanship Section */}
        <div className={`grid md:grid-cols-2 gap-8 mb-20 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-200 hover:border-[#f2413b] transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#f2413b] to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                {craftsmanship[0].icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{craftsmanship[0].title}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              {craftsmanship[0].description}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-200 hover:border-blue-500 transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                {craftsmanship[1].icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{craftsmanship[1].title}</h3>
            </div>
            <ul className="space-y-3">
              {craftsmanship[1]?.items?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700">
                  <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Why Choose Us + B2B Section */}
        <div className={`bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 shadow-2xl transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#f2413b] to-red-600 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                {t('prefabricated.why.title')}
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-3 group hover:translate-x-2 transition-transform duration-300"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-300 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* B2B Info */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                {t('prefabricated.b2b.title')}
              </h3>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                {t('prefabricated.b2b.description')}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  t('prefabricated.b2b.target1'),
                  t('prefabricated.b2b.target2'),
                  t('prefabricated.b2b.target3'),
                  t('prefabricated.b2b.target4')
                ].map((target, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-cyan-400">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm">{target}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Section at Bottom */}
        <div className={`mt-20 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            <div className="aspect-video relative">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/video/Casa Seumelle_2_compressed.mp4" type="video/mp4" />
              </video>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-8">
                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#f2413b] rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-white text-2xl font-bold">{t('prefabricated.video.title')}</h4>
                  </div>
                  <p className="text-slate-300 text-lg">{t('prefabricated.video.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default PrefabricatedOutsolesSection;