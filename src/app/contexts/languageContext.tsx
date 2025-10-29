// app/contexts/LanguageContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../locales/en/common.json';
import fr from '../locales/fr/common.json';

const translations = { en, fr };

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

// Define a type for a single translation value or a nested translation object
type TranslationValue = string | TranslationObject;
interface TranslationObject extends Record<string, TranslationValue> {}

const t = (key: string): string => {
  try {
    const keys = key.split('.');
    // 💡 FIX HERE: Change 'any' to a type that allows property access
    let value: TranslationObject | TranslationValue = 
      translations[locale as keyof typeof translations] || translations.en;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        // Here, TypeScript knows 'value' is a TranslationObject
        value = (value as TranslationObject)[k]; 
      } else {
        return key;
      }
    }
    
    // Final result must be a string (the translation)
    return (typeof value === 'string' ? value : key) || key;
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