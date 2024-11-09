'use client';

import React, { useContext } from 'react';
import styles from './footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageContext } from '../languageContext/languageContext';

export default function Footer(): React.ReactElement {
  const languages = useContext(LanguageContext);
  const currentLanguage = languages.currentLanguage;
  return (
    <footer id={styles.footer}>
      <div id={styles.background} />
      <div id={styles.left}>
        <Link href='/' id={styles.logoWrapper}>
          <Image className={styles.image} alt={currentLanguage?.header.logoAlt} src='/images/Logo.webp' width='0' height='0' sizes="100vw"/>
        </Link>
      </div>
      <div id={styles.right}>
        <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/acervusofc/' className={styles.socialLink}><Image className={styles.socialImage} alt={currentLanguage?.pages.homepage.contact.instagram} src='/images/instagram.svg' width='0' height='0' sizes="100vw"/> Instagram: @acervusofc</a>
        <a target="_blank" rel="noopener noreferrer" href='mailto:acervusoficial@gmail.com' className={styles.socialLink}><Image className={styles.socialImage} alt={currentLanguage?.pages.homepage.contact.email} src='/images/email.svg' width='0' height='0' sizes="100vw"/> E-mail: acervusoficial@gmail.com</a>
      </div>
    </footer>
  );
}