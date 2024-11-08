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
          <Image className={styles.image} alt={currentLanguage?.header.logoAlt} src='/images/Logo.png' width='0' height='0' sizes="100vw"/>
        </Link>
      </div>
      <div id={styles.right}>
        <Link href='https://www.instagram.com/acervusofc/' className={styles.socialLink}>Instagram: @acervusofc</Link>
        <Link href='mailto:acervusoficial@gmail.com' className={styles.socialLink}>E-mail: acervusoficial@gmail.com</Link>
      </div>
    </footer>
  );
}