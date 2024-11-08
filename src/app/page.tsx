'use client';
import React, { useContext, useState } from 'react';
import { LanguageContext } from './components/languageContext/languageContext';
import styles from './page.module.css';
import archives from '../../public/database/archives.json';
import ArchiveItem from './components/archiveItem/archiveItem';
import { redirect } from 'next/navigation';

export default function Home() {
  const [showMoreArchives, setShowMoreArchives] = useState(false);
  const languages = useContext(LanguageContext);
  const currentLanguage = languages.currentLanguage;
  return (
    <main className={styles.page}>
      <section id='acervo' className={styles.section}>
        <h1 className={styles.sectionTitle}>{currentLanguage.pages.homepage.archive.title}</h1>
        <div id={styles.gallery}>
          {archives.archives.slice(0, showMoreArchives ? archives.archives.length : 9).map((archive, index) => {
            return (<ArchiveItem key={index} index={index} id={archive} onClick={() => { redirect(`/item/${archive}`); }}/>);
          })}
        </div>
        <button id={styles.showMoreArchivesButton} onClick={() => { setShowMoreArchives(!showMoreArchives); }}>{showMoreArchives ? currentLanguage.pages.homepage.archive.showLess : currentLanguage.pages.homepage.archive.showMore}</button>
      </section>
      <div className={styles.parallaxContainer} style={{backgroundImage: 'url(/images/parallax1.jpg)'}}/>
      <section id='sobre' className={`${styles.section} ${styles.sobre}`}>
        <h1 className={styles.sectionTitle}>{currentLanguage.pages.homepage.about.title}</h1>
        <p className={styles.paragraph}>{currentLanguage.pages.homepage.about.text}</p>
      </section>
      <div className={styles.parallaxContainer} style={{backgroundImage: 'url(/images/parallax2.jpg)'}}/>
      <section id='contato' className={`${styles.section} ${styles.contato}`}>
        <h1 className={styles.sectionTitle}>{currentLanguage.pages.homepage.contact.title}</h1>
      </section>
    </main>
  );
}
