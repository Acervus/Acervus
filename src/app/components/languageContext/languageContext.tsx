'use client';
import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import languages from '../../../../public/languages/index.json';
import defaultLang from '../../../../public/languages/pt-BR.json';

export const LanguageContext = createContext({} as { selected: string | undefined, currentLanguage: typeof defaultLang | undefined, setLanguage: (langCode: string) => void, availableLangs: typeof languages.languages });

export function Language({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<typeof defaultLang>(defaultLang);
  const [currentLanguageCode, setCurrentLanguageCode] = useState<string>();

  async function setLanguage(langCode: string) {
    const language = languages.languages.find(language => language.id === langCode);
    if (language && currentLanguageCode !== langCode) {
      const data = await fetch(`/languages/${langCode}.json`, { cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache' } );
      const parsedData = await data.json();

      localStorage.setItem('CurrentLangCode', langCode);
      setCurrentLanguageCode(langCode);
      setCurrentLanguage(parsedData);
      document.documentElement.lang = langCode;
    }
  }

  // initial language
  useEffect(() => {
    const initialLang = localStorage.getItem('CurrentLangCode') ?? 'pt-BR';
    setLanguage(initialLang);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LanguageContext.Provider value={{ selected: currentLanguageCode, currentLanguage, setLanguage, availableLangs: languages.languages }}>
      {children}
    </LanguageContext.Provider>
  );
}