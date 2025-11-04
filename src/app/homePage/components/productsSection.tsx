'use client';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/app/contexts/languageContext';

function ProductsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();

  const products = [
    {
      title: t('product.items.lightSole.title'),
      description: t('product.items.lightSole.description'),
      image: "/img/17.png",
      color: "from-orange-50 to-amber-50"
    },
    {
      title: t('product.items.orthopedicSoles.title'),
      description: t('product.items.orthopedicSoles.description'),
      image: "/img/3.png",
      color: "from-slate-50 to-stone-50"
    },
    {
      title: t('product.items.flatHeelSoles.title'),
      description: t('product.items.flatHeelSoles.description'),
      image: "/img/7.png",
      color: "from-rose-50 to-pink-50"
    },
    {
      title: t('product.items.fashionSole.title'),
      description: t('product.items.fashionSole.description'),
      image: "/img/15.png",
      color: "from-slate-50 to-gray-50"
    }
  ];

  const materials = [
    {
      icon: "👞",
      name: t('product.materials.eva.name'),
      description: t('product.materials.eva.description'),
      color: "bg-red-50 border-red-200"
    },
    {
      icon: "👟",
      name: t('product.materials.microporous.name'),
      description: t('product.materials.microporous.description'),
      color: "bg-orange-50 border-orange-200"
    },
    {
      icon: "🥾",
      name: t('product.materials.rubber.name'),
      description: t('product.materials.rubber.description'),
      color: "bg-red-50 border-red-200"
    },
    {
      icon: "🌱",
      name: t('product.materials.cork.name'),
      description: t('product.materials.cork.description'),
      color: "bg-orange-50 border-orange-200"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isDragging) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % products.length);
      }, 6000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isDragging, products.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setDragOffset(diff);
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Threshold for slide change (30% of container width)
    const threshold = containerRef.current ? containerRef.current.offsetWidth * 0.3 : 100;

    if (dragOffset > threshold) {
      prevSlide();
    } else if (dragOffset < -threshold) {
      nextSlide();
    }

    setDragOffset(0);
    setTranslateX(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div id='ourProducts' className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-[#000000] rounded-full mb-4 animate-fade-in">
            <span className="text-sm text-[#f2413b] font-medium uppercase tracking-wide">
              {t('product.badge')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            {t('product.title.line1')} <span className="text-[#f2413b]">{t('product.title.line2')}</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {t('product.description')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
          {/* Left Side - Materials List */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-8">
              {t('product.materials.title')}
            </h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {t('product.materials.description')}
            </p>

            <div className="space-y-4">
              {materials.map((material, index) => (
                <div 
                  key={index}
                  className="group relative bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  style={{ 
                    animation: `fadeInUp 0.6s ease-out forwards`,
                    animationDelay: `${index * 100}ms`,
                    opacity: 0
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${material.color} rounded-lg flex items-center justify-center flex-shrink-0 text-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {material.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1 group-hover:text-[#f2413b] transition-colors">
                        {material.name}
                      </h4>
                      <p className="text-sm text-slate-600">{material.description}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Product Carousel */}
          <div className="relative">
            <div className="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-xl overflow-hidden">
              {/* Product Cards Container */}
              <div 
                ref={containerRef}
                className="relative h-[500px] touch-pan-y cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {products.map((product, index) => {
                  const position = index - currentSlide;
                  const isActive = index === currentSlide;
                  
                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all ${isDragging ? 'duration-0' : 'duration-500 ease-out'}`}
                      style={{
                        transform: `translateX(calc(${position * 100}% + ${translateX}px)) scale(${isActive ? 1 : 0.9})`,
                        opacity: Math.abs(position) > 1 ? 0 : isActive ? 1 : 0.3,
                        pointerEvents: isActive ? 'auto' : 'none',
                        zIndex: isActive ? 10 : 1
                      }}
                    >
                      <div className="space-y-6 h-full flex flex-col">
                        {/* Product Image */}
                        <div className={`flex-1 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center relative overflow-hidden group border border-slate-200`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-amber-100/30 group-hover:from-amber-50/20 group-hover:to-amber-100/40 transition-all duration-500"></div>
                          <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                            <div className={`text-8xl transform transition-transform duration-500 ${isActive && !isDragging ? 'scale-100' : 'scale-90'}`}>
                              <Image src={product.image} alt={product.title} width={400} height={400} />
                            </div>
                          </div>
                          
                          {/* Shine effect on drag */}
                          {isDragging && isActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-3">
                          <h3 className="text-2xl font-bold text-slate-900">{product.title}</h3>
                          <p className="text-slate-600">{product.description}</p>
                          <button className="group inline-flex items-center gap-2 text-[#f2413b] font-medium hover:gap-3 transition-all">
                            {t('product.cta.product')}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Swipe hint indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none">
                  <div className="flex items-center gap-2 text-slate-400 text-sm animate-pulse">
                    <ChevronLeft className="w-4 h-4" />
                    <span>{t('product.swipe')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-[#f2413b] transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {/* Dots */}
                <div className="flex gap-2">
                  {products.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'w-8 bg-[#f2413b]' 
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-[#f2413b] transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-200 rounded-full blur-2xl opacity-40"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-slate-300 rounded-full blur-2xl opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button className="group px-8 py-4 bg-slate-900 text-white rounded-md font-medium hover:bg-[#f2413b] transition-all duration-300 flex items-center gap-2 mx-auto hover:scale-105 active:scale-95">
            {t('product.cta.allProducts')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 1s infinite;
        }
      `}</style>
    </div>
  );
}

export default ProductsSection;