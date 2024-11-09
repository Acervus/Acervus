'use client';

import React, { ReactElement, useState } from 'react';
import styles from './carrousel.module.css';

export default function Carrousel(props: { elements: ReactElement[], mainElementStyle: string, extraStyle?: string }): React.ReactElement {
  const [carrouselCurrent, setCarrouselCurrent] = useState<number>(0);

  function moveCarrousel(amount: number, force?: boolean): void {
    let nextValue = 0; 
    if (!force) {
      const next = carrouselCurrent + amount;
      if (next < 0) {
        nextValue = props.elements.length - 1;
      } else if (next >= props.elements.length) {
        nextValue = 0;
      } else {
        nextValue = next;
      }
    } else {
      nextValue = amount;
    }
    document.getElementById(styles.itemList).children[nextValue].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest', });
    setCarrouselCurrent(nextValue);
  }

  return (<div className={`${styles.Carrousel} ${props.extraStyle}`}>
    <div className={`${styles.mainItem} ${props.mainElementStyle}`}>
      {props.elements[carrouselCurrent]}
    </div>
    <div className={styles.carrouselInputs}>
      <button className={styles.rewindCarrousel} onClick={() => { moveCarrousel(-1); }}></button>
      <div id={styles.itemList}>
        {props.elements.map((item, index) => {
          return <div key={`CARROUSEL-${index}`} className={`${styles.carrouselItem} ${carrouselCurrent === index ? styles.selectedItem : ''}`} onClick={() => { moveCarrousel(index, true); }}>
            {item}
          </div>;
        })}
      </div>
      <button className={styles.advanceCarrousel} onClick={() => { moveCarrousel(1); }}></button>
    </div>
  </div>);
}