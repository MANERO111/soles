import {  ArrowRight } from 'lucide-react';
import Image from "next/image";
function HeroSection() {
    return (
      <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
  
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-20"></div>
  
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
                <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                <span className="text-sm text-amber-800 font-medium">10 Years of Excellence</span>
              </div>
  
              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
                  Premium
                  <span className="block text-amber-600">Shoe Soles</span>
                  Manufacturing
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
                  Where tradition meets innovation. Crafting high-performance soles with cutting-edge technology and artisanal expertise for the global footwear industry.
                </p>
              </div>
  
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="group px-8 py-4 bg-slate-900 text-white rounded-md font-medium hover:bg-amber-600 transition-all duration-300 flex items-center gap-2">
                  Explore Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-md font-medium hover:bg-slate-900 hover:text-white transition-all duration-300">
                  Contact Us
                </button>
              </div>
  
              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-slate-200">
                <div>
                  <div className="text-3xl font-bold text-slate-900">70%</div>
                  <div className="text-sm text-slate-600 mt-1">Export Worldwide</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">1000+</div>
                  <div className="text-sm text-slate-600 mt-1">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">4 Types</div>
                  <div className="text-sm text-slate-600 mt-1">Sole Materials</div>
                </div>
              </div>
            </div>
  
            {/* Right Content - Visual */}
            <div className="relative">
              {/* Main Card */}
              <div className="relative z-10 bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
                <div className="space-y-6">
                  {/* Product Preview */}
                  <div className="aspect-square bg-gradient-to-br from-slate-50 to-amber-50 rounded-xl flex items-center justify-center relative overflow-hidden group border border-slate-200">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-amber-100/30 group-hover:from-amber-50/20 group-hover:to-amber-100/40 transition-all duration-500"></div>
                    <div className="text-8xl relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                      <Image src="/img/soles1.png" alt="Product Preview" width={450} height={450} />
                    </div>
                  </div>
  
                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="text-slate-900 font-semibold text-sm">EVA</div>
                      <div className="text-slate-600 text-xs mt-1">Lightweight</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="text-slate-900 font-semibold text-sm">Rubber</div>
                      <div className="text-slate-600 text-xs mt-1">Durable</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="text-slate-900 font-semibold text-sm">Cork</div>
                      <div className="text-slate-600 text-xs mt-1">Eco-friendly</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="text-slate-900 font-semibold text-sm">Microporous</div>
                      <div className="text-slate-600 text-xs mt-1">Comfort</div>
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
  
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-amber-600 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    );
  }
  
  export default HeroSection;