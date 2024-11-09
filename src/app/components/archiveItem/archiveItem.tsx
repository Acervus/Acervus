import React, { useState, useEffect, useContext } from 'react';
import getItemData from '../getItemData/getItemData';
import { Item } from '../../interfaces/pages/item/item';
import { LanguageContext } from '../languageContext/languageContext';
import styles from './archiveItem.module.css';
import Image from 'next/image';

export default function ArchiveItem(props: { id: string, index: number, onClick: () => void }): React.ReactElement {
  const [focused, setFocused] = useState<boolean>(false);
  const [item, setItem] = useState<Item>();
  const languages = useContext(LanguageContext);
  const currentLanguage = languages.selected;
  const language = languages.currentLanguage;

  useEffect(() => {
    getItemData(props.id)
    .then(data => setItem(data)).catch(() => {});
  }, [props]);

  useEffect(() => {
    function unFocus(e: MouseEvent) {
      if (focused && !document.getElementById(`${item.id}-${props.index}`)?.contains(e.target as Node)) {
        setFocused(false);
      }
    }

    window.addEventListener('click', (e) => unFocus(e));

    return () => {
      window.removeEventListener('click', (e) => unFocus(e));
    };
  }, [focused, item, props]);

  if (!item || !currentLanguage) {
    return (<div className={styles.loading}>{currentLanguage ? language.loading : '' }...</div>);
  }

  return (
    <div id={`${item.id}-${props.index}`} className={styles.archiveItem} tabIndex={0} onClick={(e) => {
      e.preventDefault();
      if (window.innerWidth > 768) return props.onClick();
      if (focused) {
        props.onClick();
        setFocused(false);
      } else setFocused(true);
    }}>
      <div className={styles.backgroundImage}>
        <Image src={item.thumbnail ? `/database/${item.id}/${item.thumbnail}` : '/images/noImageSquare.webp'} alt={item.data[currentLanguage].thumbnailAlt} width='0' height='0' sizes='100vw' className={styles.image}/>
      </div>
      <div className={styles.foregroundContent}>
        <h1 className={styles.title}>{item.data[currentLanguage].name}</h1>
      </div>
    </div>
  );
}