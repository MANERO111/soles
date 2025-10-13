'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Sparkles, Heart, Wrench, Users } from 'lucide-react';
import Image from "next/image";

function PhilosophySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const imageRef = useRef<HTMLImageElement>(null);

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

  return (
    <div 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-32 overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] animate-grid-scroll"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-red-500 rounded-full blur-3xl opacity-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-slate-500 rounded-full blur-3xl opacity-5 animate-float"></div>

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Badge */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500/20 to-red-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            <span className="text-sm text-amber-200 font-semibold uppercase tracking-widest">Our Philosophy</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Image with Interactive Elements */}
          <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div 
              ref={imageRef}
              onMouseMove={handleMouseMove}
              className="relative group cursor-pointer"
            >
              {/* Main Image Container with Morph Effect */}
              <div className="relative aspect-square overflow-hidden rounded-[60px] rotate-6 group-hover:rotate-0 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-white to-slate-200 animate-morph">
                  {/* Placeholder for actual image */}
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <div className="relative w-full h-full bg-gradient-to-br from-slate-100 to-amber-100 overflow-hidden">
                      <Image 
                        src="/img/broker.jpg" 
                        alt="Craftsmanship"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        width={500}
                        height={500}
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
                    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)`
                  }}
                ></div>
              </div>

              {/* Floating Decorative Circles */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-80 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500 shadow-2xl shadow-amber-500/50 flex items-center justify-center">
                <Heart className="w-10 h-10 text-white animate-pulse" />
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full opacity-90 group-hover:scale-125 group-hover:translate-y-2 transition-all duration-500 shadow-2xl shadow-slate-900/50 flex items-center justify-center">
                <Wrench className="w-12 h-12 text-amber-400 animate-spin-slow" />
              </div>

              <div className="absolute top-1/2 -right-4 w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full opacity-70 group-hover:scale-125 group-hover:translate-x-2 transition-all duration-500 shadow-2xl shadow-red-500/50 animate-bounce-slow flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-[60px] blur-2xl transform scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>

            {/* Background decoration */}
            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-amber-500/10 to-red-500/10 rounded-[60px] blur-3xl transform scale-110 animate-pulse-slow"></div>
          </div>

          {/* Right Side - Content */}
          <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            {/* Title */}
            <div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
                Craftsmanship meets
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 animate-shimmer">
                  Innovation
                </span>
              </h2>
            </div>

            {/* Description Paragraphs */}
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p className="group hover:text-white transition-colors duration-300">
                As a <span className="text-amber-400 font-semibold">growing company</span>, we believe in the perfect balance between modern technology and traditional handcrafted techniques. Our approach ensures each sole is crafted with precision and passion.
              </p>
              
              <div className="relative pl-6 border-l-4 border-amber-500/50 hover:border-amber-500 transition-colors duration-300">
                <p>
                  <span className="text-amber-400 font-bold">50% of our production</span> remains handcrafted - a unique advantage that allows us to handle custom orders, create prototypes, and produce limited-edition collections with unmatched flexibility and quality.
                </p>
              </div>

              <p className="group hover:text-white transition-colors duration-300">
                Every sole is <span className="text-white font-semibold">designed in collaboration</span> with designers and manufacturers, combining functionality, style, and superior materials. Our attention to detail ensures industrial efficiency with artisanal excellence.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-sm font-medium hover:bg-amber-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                ✨ Custom Solutions
              </div>
              <div className="px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-full text-red-300 text-sm font-medium hover:bg-red-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                🎯 Quality Focus
              </div>
              <div className="px-4 py-2 bg-slate-500/20 border border-slate-500/40 rounded-full text-slate-300 text-sm font-medium hover:bg-slate-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                🚀 Fast Delivery
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold text-lg shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/80 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  Get in Touch
                  <Users className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
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