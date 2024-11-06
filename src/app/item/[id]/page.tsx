'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import getItemData from './getItemData';
import { Item } from '../../interfaces/pages/item/item';
import Image from 'next/image';
import { LanguageContext } from '../../components/languageContext/languageContext';
import styles from './item.module.css';
import Carrousel from '../../components/carrousel/carrousel';

export default function ArchivePage({ params }: { params: Promise<{ id: string }> }): React.ReactElement {
  const router = useRouter();
  const [item, setItem] = useState<Item>();
  const language = useContext(LanguageContext);
  const currentLanguage = language.selected;
  
  useEffect(() => {
    params
    .then(param => decodeURI(param.id))
    .then(id => getItemData(id))
    .then(data => setItem(data))
    .catch(() => {
      router.push('/404');
    });
  }, [router, params]);

  if (!item) {
    return (<div>Loading...</div>);
  }

  return (<div id={styles.page}>
    <Carrousel
      elements={
        item.data[currentLanguage].images.map((image) => {
          return (<Image key={`${item.id}-${image.url}`} src={`/database/${item.id}/${image.url}`} alt={image.alt} width='0' height='0' sizes='100vw' className={styles.imageCover}/>);
        })
      }
      mainElementStyle={styles.mainCarrouselStyle}
      extraStyle={styles.leftSideItem}
    />
    <div id={styles.details}>
      <h1 id={styles.title}>{item.data[currentLanguage].name}</h1>
      <h3 id={styles.origin}>{item.data[currentLanguage].origin}</h3>
      <audio controls id={styles.audioPlayer}>
        <source src={`/database/${item.id}/${item.data[currentLanguage].audioPath}`} type='audio/mp3'/>
        {language.currentLanguage.pages.items.noSupportAudio}
      </audio>
      <p id={styles.description}>{item.data[currentLanguage].description}</p>
    </div>
  </div>);
}