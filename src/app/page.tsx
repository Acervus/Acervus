'use client';
import React, { useContext, useState } from 'react';
import { LanguageContext } from './components/languageContext/languageContext';
import styles from './page.module.css';
import archives from '../../public/database/archives.json';
import ArchiveItem from './components/archiveItem/archiveItem';

export default function Home() {
  const [showMoreArchives, setShowMoreArchives] = useState(false);
  const languages = useContext(LanguageContext);
  const currentLanguage = languages.currentLanguage;
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section id='acervo' className={styles.section}>
          <h1 className={styles.sectionTitle}>{currentLanguage.pages.homepage.archive.title}</h1>
          <div id={styles.gallery}>
            {archives.archives.slice(0, showMoreArchives ? archives.archives.length : 9).map((archive, index) => {
              return (<ArchiveItem key={index} index={index} id={archive} onClick={() => { console.log('oi'); }}/>);
            })}
          </div>
          <button id={styles.showMoreArchivesButton} onClick={() => { setShowMoreArchives(!showMoreArchives); }}>{showMoreArchives ? currentLanguage.pages.homepage.archive.showLess : currentLanguage.pages.homepage.archive.showMore}</button>
        </section>
        
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
