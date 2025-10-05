
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
// Fix: Added .ts extension to the import path.
import { LANGUAGES } from '../constants.ts';
// Fix: Added .ts extension to the import path.
import type { Language } from '../types.ts';

interface AppContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('naija-tutor-language');
      if (savedLang) {
        const lang = JSON.parse(savedLang);
        return LANGUAGES.find(l => l.code === lang.code) || LANGUAGES[0];
      }
    } catch (error) {
      console.error("Failed to parse language from localStorage", error);
    }
    return LANGUAGES[0];
  });

  useEffect(() => {
    try {
      localStorage.setItem('naija-tutor-language', JSON.stringify(language));
    } catch (error) {
      console.error("Failed to save language to localStorage", error);
    }
  }, [language]);

  const value = { language, setLanguage };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};