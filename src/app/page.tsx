'use client';
import React, { useContext } from 'react';
import { LanguageContext } from './components/languageContext/languageContext';
import styles from './page.module.css';

export default function Home() {
  const languages = useContext(LanguageContext);
  const currentLanguage = languages.currentLanguage;
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{currentLanguage?.pages.homepage.title}</h1>
        <p>{currentLanguage?.pages.homepage.description}</p>
        
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
