'use client';
import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from './components/languageContext/languageContext';
import styles from './page.module.css';
import archives from '../../public/database/archives.json';
import ArchiveItem from './components/archiveItem/archiveItem';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const routes = useRouter();
  const [showMoreArchives, setShowMoreArchives] = useState<boolean>();
  const languages = useContext(LanguageContext);
  const currentLanguage = languages.currentLanguage;

  function setMoreArchives(state: boolean) {
    setShowMoreArchives(state);
    localStorage.setItem('showMoreArchives', state.toString());
  }

  useEffect(() => {
    const moreArchives = localStorage.getItem('showMoreArchives');
    if (moreArchives) setMoreArchives(moreArchives === 'true');
  }, []);

  function parseParagraph(text: string): React.ReactElement {
    const parts = text.split(/<u>(.*?)<\/u>/gimu);
    return (<>
      {parts.map((fragment, index) => {
        return index % 2 === 0 ? fragment : fragment.split(' ').map((frag, index) => {
          return (<span key={`${frag}-${index}`} className={styles.underlined}>{frag} </span>);
        });
      })}
    </>);
  }

  return (
    <main className={styles.page}>
      <div className={styles.parallaxContainer} style={{backgroundImage: 'url(/images/parallax4.webp)'}}/>
      <section id='casaDeTaipa' className={styles.section}>
        <h1 className={styles.sectionTitle}>{currentLanguage.pages.homepage.casaDeTaipa.name}</h1>
        {currentLanguage.pages.homepage.casaDeTaipa.about.map((item, index) => {
          return (<div key={`casa-de-taipa-${index}`} className={styles.casaDeTaipaAboutBox}>
            {item.map((paragraph, pIndex) => {
              return (<p key={`casa-de-taipa-${index}-${pIndex}`}>{parseParagraph(paragraph)}</p>);
            })}
          </div>);
        })}
      </section>
      <div className={styles.parallaxContainer} style={{backgroundImage: 'url(/images/parallax3.webp)'}}/>
      <section id='acervo' className={styles.section}>
        <h1 className={styles.sectionTitle}>{currentLanguage.pages.homepage.archive.title}</h1>
        <div id={styles.gallery}>
          {archives.archives.slice(0, showMoreArchives ? archives.archives.length : 9).map((archive, index) => {
            return (<ArchiveItem key={index} index={index} id={archive} onClick={() => { routes.push(`/item/${archive}`); }}/>);
          })}
        </div>
        <button id={styles.showMoreArchivesButton} onClick={() => { setMoreArchives(!showMoreArchives); }}>{showMoreArchives ? currentLanguage.pages.homepage.archive.showLess : currentLanguage.pages.homepage.archive.showMore}</button>
      </section>
      <div className={styles.parallaxContainer} style={{backgroundImage: 'url(/images/parallax1.webp)'}}/>
      <section id='sobre' className={`${styles.section} ${styles.sobre}`}>
        <h1 className={styles.sectionTitle}>{currentLanguage.pages.homepage.about.title}</h1>
        <p className={styles.paragraph}>{currentLanguage.pages.homepage.about.text}</p>
      </section>
      <div className={styles.parallaxContainer} style={{backgroundImage: 'url(/images/parallax2.webp)'}}/>
      <section id='contato' className={`${styles.section} ${styles.contato}`}>
        <h1 className={styles.sectionTitle}>{currentLanguage.pages.homepage.contact.title}</h1>
        <div className={styles.contactList}>
          <a className={styles.contactItem} href='https://www.instagram.com/acervusofc/' rel="noopener noreferrer" target="_blank">
            <svg className={styles.contactImage} aria-label={currentLanguage.pages.homepage.contact.instagram} viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M180.006 359.582C163.619 359.582 147.232 359.791 130.803 359.498C116.092 359.248 101.381 359.08 86.7956 356.781C68.8576 353.938 52.2188 347.919 37.8432 336.339C20.4919 322.334 9.88834 304.149 4.85898 282.578C2.67959 273.256 1.63181 263.766 1.17079 254.235C-0.631401 217.447 0.206826 180.659 0.123003 143.829C0.0810915 130.159 0.584028 116.489 1.25461 102.777C2.00901 86.4319 4.98472 70.4208 12.1935 55.5803C23.5095 32.337 41.5314 16.4932 66.0076 8.00686C76.8627 4.24446 88.0111 2.07063 99.4948 1.56898C115.756 0.900107 132.018 0.314846 148.238 0.147628C173.552 -0.0613941 198.783 -0.0613941 224.097 0.231237C237.886 0.35665 251.717 0.941912 265.464 2.07063C283.025 3.49198 299.747 8.29949 314.626 18.0399C334.785 31.2083 347.736 49.7277 354.064 72.9291C356.914 83.422 358.255 94.0821 358.8 104.909C360.728 144.874 359.764 184.84 359.722 224.805C359.722 238.349 359.094 251.936 357.92 265.397C356.286 284.543 350.837 302.561 339.437 318.279C324.894 338.304 305.154 350.218 281.139 355.443C269.278 358.035 257.291 358.871 245.221 359.08C223.51 359.457 201.758 359.749 180.048 360C180.006 359.875 180.006 359.707 180.006 359.582ZM179.965 327.184C179.965 327.309 179.965 327.351 179.965 327.476C200.166 327.184 220.283 326.975 240.485 326.556C250.962 326.347 261.482 326.013 271.834 323.965C281.348 322.083 290.401 319.032 298.448 313.388C312.991 303.23 320.829 288.891 324.14 271.793C326.319 260.38 326.529 248.758 326.864 237.22C327.241 226.477 327.367 215.733 327.283 205.031C327.157 176.52 326.99 148.01 326.654 119.499C326.529 109.006 326.109 98.5134 324.098 88.1459C322.086 77.9038 318.649 68.247 312.321 59.8025C301.675 45.6308 287.048 38.4823 270.032 35.5142C259.303 33.633 248.406 33.4657 237.551 33.1313C226.025 32.7551 214.499 32.6715 202.974 32.6715C171.163 32.7133 139.352 32.2116 107.5 33.7166C98.8661 34.0928 90.2743 35.0961 81.892 37.3117C65.5466 41.6594 52.6379 50.731 44.0042 65.4043C37.5079 76.3989 34.8675 88.6058 34.1131 101.189C33.3587 114.315 32.7719 127.442 32.6881 140.569C32.5205 167.951 32.6462 195.332 32.8138 222.673C32.8558 231.493 33.191 240.314 33.4425 249.135C33.694 258.039 34.4903 266.86 36.502 275.555C40.6094 293.155 49.8718 307.034 65.6723 316.147C76.5274 322.376 88.4721 325.01 100.836 325.72C114.122 326.473 127.45 326.891 140.777 327.142C153.854 327.393 166.93 327.184 179.965 327.184Z"/>
              <path d="M180.065 87.5582C230.987 87.1819 273.443 129.655 272.479 181.785C271.515 231.198 231.113 271.581 181.406 272.375C129.436 273.17 86.3093 230.278 87.5247 177.73C88.6982 127.941 129.855 87.1401 180.065 87.5582ZM239.789 179.821C239.789 146.879 212.965 120.124 180.023 120.124C146.997 120.124 120.174 146.879 120.174 179.904C120.174 212.888 146.913 239.684 179.855 239.684C212.965 239.726 239.789 212.93 239.789 179.821Z"/>
              <path d="M297.58 84.0106C297.58 96.0084 287.941 105.665 275.996 105.707C264.051 105.749 254.16 95.8412 254.202 83.9269C254.244 71.8873 263.926 62.3559 276.122 62.3559C288.15 62.3559 297.58 71.8873 297.58 84.0106Z"/>
            </svg>
            <span className={styles.contactLabel}>{currentLanguage.pages.homepage.contact.instagram}</span>
          </a>
          <a className={styles.contactItem} href='mailto:acervusoficial@gmail.com' rel="noopener noreferrer" target="_blank">
            <svg className={styles.contactImage} aria-label={currentLanguage.pages.homepage.contact.instagram} viewBox="3 3 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"/>
            </svg>
            <span className={styles.contactLabel}>{currentLanguage.pages.homepage.contact.email}</span>
          </a>
          
        </div>
      </section>
      <div className={styles.parallaxContainer} style={{backgroundImage: 'url(/images/parallax4.webp)'}}/>
    </main>
  );
}
