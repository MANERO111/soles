"use client";
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Award, Users, Factory, Globe, TrendingUp, Heart, Shield, Zap, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/app/contexts/languageContext';

function AboutUsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('mission');
  const [countUpValues, setCountUpValues] = useState({ years: 0, clients: 0, countries: 0, products: 0 });
  const sectionRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

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

  const scrollToSection = (sectionId: string) => {
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

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    handleSectionNavigation(sectionId);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            animateCountUp();
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

  const animateCountUp = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCountUpValues({
        years: Math.floor(7 * progress),
        clients: Math.floor(1000 * progress),
        countries: Math.floor(50 * progress),
        products: Math.floor(100 * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCountUpValues({ years: 7, clients: 1000, countries: 50, products: 100 });
      }
    }, stepDuration);
  };

  const stats = [
    { icon: Award, label: t('about.stats.years'), value: countUpValues.years, suffix: '+', color: 'from-amber-500 to-orange-500' },
    { icon: Users, label: t('about.stats.clients'), value: countUpValues.clients, suffix: '+', color: 'from-blue-500 to-cyan-500' },
    { icon: Globe, label: t('about.stats.countries'), value: countUpValues.countries, suffix: '+', color: 'from-green-500 to-emerald-500' },
    { icon: Factory, label: t('about.stats.products'), value: countUpValues.products, suffix: '+', color: 'from-purple-500 to-pink-500' }
  ];

  const values = [
    {
      icon: Heart,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description')
    },
    {
      icon: Shield,
      title: t('about.values.trust.title'),
      description: t('about.values.trust.description')
    },
    {
      icon: Zap,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: Target,
      title: t('about.values.customer.title'),
      description: t('about.values.customer.description')
    }
  ];

  const milestones = [
    { year: t('about.timeline.2018.year'), title: t('about.timeline.2018.title'), description: t('about.timeline.2018.description'), icon: '🏭' },
    { year: t('about.timeline.2020.year'), title: t('about.timeline.2020.title'), description: t('about.timeline.2020.description'), icon: '🌱' },
    { year: t('about.timeline.2022.year'), title: t('about.timeline.2022.title'), description: t('about.timeline.2022.description'), icon: '⚡' },
    { year: t('about.timeline.2024.year'), title: t('about.timeline.2024.title'), description: t('about.timeline.2024.description'), icon: '🌍' },
    { year: t('about.timeline.today.year'), title: t('about.timeline.today.title'), description: t('about.timeline.today.description'), icon: '👑' }
  ];

  const team = [
    { role: t('about.team.craftsmen'), count: '25+', icon: '👨‍🔧', color: 'from-amber-500 to-orange-500' },
    { role: t('about.team.designers'), count: '15+', icon: '🎨', color: 'from-blue-500 to-cyan-500' },
    { role: t('about.team.quality'), count: '12+', icon: '✅', color: 'from-green-500 to-emerald-500' },
    { role: t('about.team.innovation'), count: '8+', icon: '💡', color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"></div>
      
      {/* Decorative Blobs */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="fixed bottom-40 left-20 w-80 h-80 bg-slate-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-50 border-2 border-[#f2413b] rounded-full mb-8 shadow-lg">
              <Factory className="w-5 h-5 text-[#f2413b] animate-pulse" />
              <span className="text-sm text-amber-800 font-semibold uppercase tracking-wider">
                {t('about.hero.badge')}
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-slate-900 leading-tight mb-8">
              {t('about.hero.title.line1')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#f2413b] to-red-500 animate-gradient">
                {t('about.hero.title.line2')}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
              {t('about.hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => scrollToSection("our-journey")} className="group px-8 py-4 bg-gradient-to-r from-[#f2413b] to-red-500 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/80 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
                {t('about.hero.cta.discover')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <a
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')}
                className="px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-900 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
              >
                {t('about.hero.cta.contact')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-white/50 backdrop-blur-sm border-y-2 border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#f2413b] hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-5xl font-black text-slate-900 mb-2 group-hover:text-[#f2413b] transition-colors">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission/Vision Section */}
      <section id='mission' className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">
              {t('about.purpose.title.prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f2413b] to-orange-600">{t('about.purpose.title.highlight')}</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { 
                title: t('about.purpose.mission.title'),
                content: t('about.purpose.mission.description'),
                icon: Target,
                color: 'from-[#f2413b] to-orange-500'
              },
              { 
                title: t('about.purpose.vision.title'),
                content: t('about.purpose.vision.description'),
                icon: Globe,
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                title: t('about.purpose.promise.title'),
                content: t('about.purpose.promise.description'),
                icon: Heart,
                color: 'from-green-500 to-emerald-500'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-slate-200 hover:border-[#f2413b] hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${(index + 4) * 10}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#f2413b] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id='our-journey' className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              {t('about.timeline.title.prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f2413b] to-orange-400">{t('about.timeline.title.highlight')}</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {t('about.timeline.subtitle')}
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-orange-500 to-[#ff1a13] transform -translate-x-1/2 hidden lg:block"></div>

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col gap-8`}
                >
                  {/* Content Card */}
                  <div className="flex-1 w-full lg:w-auto">
                    <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-amber-200 hover:border-[#f2413b] transition-all duration-300 hover:-translate-y-2 group">
                      <div className="flex items-start gap-4">
                        <div className="text-5xl">{milestone.icon}</div>
                        <div>
                          <div className="text-sm font-bold text-amber-600 mb-2">{milestone.year}</div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#f2413b] transition-colors">
                            {milestone.title}
                          </h3>
                          <p className="text-slate-600 leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-[#f2413b] to-orange-500 rounded-full border-4 border-slate-900 shadow-lg z-10"></div>

                  {/* Spacer */}
                  <div className="flex-1 hidden lg:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id='values' className="relative py-32 bg-white border-b-2 border-slate-200 ">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">
              {t('about.values.title.prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f2413b] to-orange-600">{t('about.values.title.highlight')}</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-slate-200 hover:border-[#f2413b] hover:-translate-y-2"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#f2413b] to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#f2413b] transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id='team' className="relative py-32 bg-gradient-to-br bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">
              {t('about.team.title.prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f2413b] to-orange-600">{t('about.team.title.highlight')}</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('about.team.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#f2413b] hover:-translate-y-2 text-center"
              >
                <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {member.icon}
                </div>
                <div className="text-4xl font-black text-slate-900 mb-2 group-hover:text-[#f2413b] transition-colors">
                  {member.count}
                </div>
                <div className="text-lg font-semibold text-slate-600">
                  {member.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-8">
            {t('about.cta.title.prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f2413b] to-orange-700">{t('about.cta.title.highlight')}</span>
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('about.cta.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a               
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')} 
              className="group px-10 py-5 bg-gradient-to-r from-[#f2413b] to-red-500 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/80 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              {t('about.cta.button')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>

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

export default AboutUsPage;