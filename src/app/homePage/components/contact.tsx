'use client';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/app/contexts/languageContext';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
          });
        }, 3000);
      } else {
        alert(t('contact.form.error'));
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.info.phone.title'),
      content: t('contact.info.phone.content'),
      link: 'tel:+391234567890',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: t('contact.info.email.title'),
      content: t('contact.info.email.content'),
      link: 'mailto:info@soletech.com',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: MapPin,
      title: t('contact.info.address.title'),
      content: t('contact.info.address.content'),
      link: '#',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Clock,
      title: t('contact.info.hours.title'),
      content: t('contact.info.hours.content'),
      link: '#',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const features = [
    {
      icon: '🎯',
      title: t('contact.features.custom.title'),
      description: t('contact.features.custom.description'),
      delay: '0'
    },
    {
      icon: '⚡',
      title: t('contact.features.response.title'),
      description: t('contact.features.response.description'),
      delay: '100'
    },
    {
      icon: '🌍',
      title: t('contact.features.shipping.title'),
      description: t('contact.features.shipping.description'),
      delay: '200'
    },
    {
      icon: '🤝',
      title: t('contact.features.support.title'),
      description: t('contact.features.support.description'),
      delay: '300'
    }
  ];

  return (
    <section id='contact' className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 rounded-full mb-6 shadow-sm">
            <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
            <span className="text-sm text-amber-800 font-medium">{t('contact.badge')}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          
          {/* Left Side - Contact Form */}
          <div className="animate-slide-in-left">
            <div className="relative bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-500">
              {/* Decorative gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
              
              <div className="relative">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {t('contact.form.title')}
                </h3>
                <p className="text-slate-600 mb-8">{t('contact.form.subtitle')}</p>
                
                <div className="space-y-6">
                  {/* Name Input */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 transition-colors">
                      {t('contact.form.name.label')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-3.5 bg-slate-50 border-2 rounded-xl transition-all duration-300 outline-none ${
                        focusedField === 'name' 
                          ? 'border-amber-600 bg-white shadow-lg shadow-amber-500/10 scale-[1.02]' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      placeholder={t('contact.form.name.placeholder')}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {t('contact.form.email.label')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-3.5 bg-slate-50 border-2 rounded-xl transition-all duration-300 outline-none ${
                        focusedField === 'email' 
                          ? 'border-amber-600 bg-white shadow-lg shadow-amber-500/10 scale-[1.02]' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      placeholder={t('contact.form.email.placeholder')}
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {t('contact.form.phone.label')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-3.5 bg-slate-50 border-2 rounded-xl transition-all duration-300 outline-none ${
                        focusedField === 'phone' 
                          ? 'border-amber-600 bg-white shadow-lg shadow-amber-500/10 scale-[1.02]' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      placeholder={t('contact.form.phone.placeholder')}
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {t('contact.form.message.label')} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField('')}
                      rows={5}
                      className={`w-full px-4 py-3.5 bg-slate-50 border-2 rounded-xl transition-all duration-300 outline-none resize-none ${
                        focusedField === 'message' 
                          ? 'border-amber-600 bg-white shadow-lg shadow-amber-500/10 scale-[1.02]' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      placeholder={t('contact.form.message.placeholder')}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || isSuccess}
                    className={`relative w-full px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group ${
                      isSuccess 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:shadow-xl hover:shadow-slate-900/30 hover:scale-[1.02]'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          {t('contact.form.sending')}
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          {t('contact.form.success')}
                        </>
                      ) : (
                        <>
                          {t('contact.form.submit')}
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Info */}
          <div className="space-y-8 animate-slide-in-right">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {t('contact.info.title')}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.link}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className="flex items-start gap-4 p-5 bg-white border-2 border-slate-200 rounded-2xl hover:border-amber-600 hover:shadow-xl transition-all duration-300 group animate-fade-in-up"
                    >
                      <div className={`w-14 h-14 bg-gradient-to-br ${info.color} text-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                          {info.title}
                        </h4>
                        <p className="text-slate-600 text-sm">
                          {info.content}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative bg-gradient-to-br from-slate-100 to-slate-50 border-2 border-slate-200 rounded-2xl overflow-hidden h-72 group hover:border-amber-600 transition-all duration-300">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-full h-full flex items-center justify-center relative z-10">
                <div className="text-center transform group-hover:scale-105 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:rotate-3 transition-transform duration-300">
                    <MapPin className="w-10 h-10" />
                  </div>
                  <p className="text-slate-900 font-bold text-lg">{t('contact.map.title')}</p>
                  <p className="text-sm text-slate-600 mt-1">{t('contact.map.address')}</p>
                  <p className="text-xs text-amber-600 font-medium mt-2">{t('contact.map.cta')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">
            {t('contact.features.title')}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                style={{ animationDelay: `${feature.delay}ms` }}
                className="relative bg-white border-2 border-slate-200 rounded-2xl p-6 text-center hover:border-amber-600 hover:shadow-xl transition-all duration-300 group animate-fade-in-up overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 inline-block">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 text-lg">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }
      `}</style>
    </section>
  );
}