'use client';
import React, { useContext, useEffect, useState } from 'react';
import styles from './header.module.css';
import Image from 'next/image';
import { LanguageContext } from '../languageContext/languageContext';
import Link from 'next/link';
import DropDown from '../dropdown/dropdown';
import { overlayContext } from '../overlayContext/overlayContext';

export default function Header(): React.ReactElement {
  const languages = useContext(LanguageContext);
  const overlay = useContext(overlayContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentLanguage = languages.currentLanguage;
  const availableLangs = languages.availableLangs;

  function toggleMobileMenu(state: boolean): void {
    overlay.setShowingOverlay(state);
    setMobileMenuOpen(state);
  }

  useEffect(() => {
    function checkWidth() {
      if (window.innerWidth > 768) toggleMobileMenu(false);
    }
    checkWidth();
    window.addEventListener('resize', () => { checkWidth(); });
    return () => { window.removeEventListener('resize', () => { checkWidth(); }); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileMenuOpen]);

  return (<header id={styles.header}>
    <div id={styles.headerContent} className={mobileMenuOpen ? styles.open : ''}>
      <div id={styles.left}>
        <Link href='/' id={styles.logoWrapper}>
          <Image className={styles.image} alt={currentLanguage?.header.logoAlt} src='/images/Logo.png' width='0' height='0' sizes="100vw"/>
        </Link>
      </div>
      <button id={styles.mobileOnly} onClick={() => { toggleMobileMenu(!mobileMenuOpen); }}>
        <div className={styles.hamburger}></div>
        <div className={styles.hamburger}></div>
        <div className={styles.hamburger}></div>
      </button>
      <div id={styles.right}>
        <nav id={styles.navigation}>
          <Link className={styles.navigationItem} href='/#acervo'>{currentLanguage?.header.navigation.archive}</Link>
          <Link className={styles.navigationItem} href='/#sobre'>{currentLanguage?.header.navigation.about}</Link>
          <Link className={styles.navigationItem} href='/#contato'>{currentLanguage?.header.navigation.contact}</Link>
        </nav>
        <div className={styles.optionEntry}>
          <span>{currentLanguage?.header.logoDropdownTxt}</span>
          <DropDown
            options={ availableLangs.map((lang) => {return { value: lang.id, text: lang.name }; }) }
            defaultValue={languages.selected}
            openUp={mobileMenuOpen}
            onChange={(value) => { if (value) languages.setLanguage(value.toString()); }}
          />
        </div>
      </div>
    </div>
  </header>);
}