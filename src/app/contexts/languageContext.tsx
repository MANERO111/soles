// app/contexts/LanguageContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../locales/en/common.json';
import fr from '../locales/fr/common.json';

// Define the translation structure based on your JSON files
type TranslationKey = string;
type TranslationValue = string | { [key: string]: TranslationValue };
type TranslationResource = Record<string, TranslationValue>;

interface Translations {
  en: TranslationResource;
  fr: TranslationResource;
}

const translations: Translations = { en, fr };

interface LanguageContextType {
  locale: string;
  switchLanguage: (newLocale: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en');

  // Load saved language from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('language');
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'fr')) {
      setLocale(savedLocale);
      document.documentElement.lang = savedLocale;
    }
  }, []);

  const switchLanguage = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem('language', newLocale);
    document.documentElement.lang = newLocale;
  };

  const t = (key: string): string => {
    try {
      const keys = key.split('.');
      let value: TranslationValue = translations[locale as keyof Translations] || translations.en;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return key; // Key not found, return the key itself
        }
      }
      
      // Ensure we return a string
      return typeof value === 'string' ? value : key;
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}