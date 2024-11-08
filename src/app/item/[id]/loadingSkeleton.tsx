import React from 'react';
import styles from './skeleton.module.css';
import Carrousel from '../../components/carrousel/carrousel';

export default function LoadingSkeleton(): React.ReactElement {
  return (<div id={styles.page}>
    <div className={styles.mobileOnly}>
      <div className={styles.loadingTitle}/>
      <div className={styles.loadingOrigin}/>
    </div>
    <Carrousel
      elements={[
        <div key={'loading-1'} className={styles.loadingImage}/>,
        <div key={'loading-2'} className={styles.loadingImage}/>,
        <div key={'loading-3'} className={styles.loadingImage}/>
      ]}
      mainElementStyle={styles.mainCarrouselStyle}
    />
    <div>
      <div className={`${styles.loadingTitle} ${styles.pcOnly}`}/>
      <div className={`${styles.loadingOrigin} ${styles.pcOnly}`}/>
      <div className={styles.loadingAudio}/>
      <div className={styles.loadingDescription}/>
      <div className={styles.loadingDescription}/>
      <div className={styles.loadingDescription}/>
      <div className={styles.loadingDescription}/>
      <div className={styles.loadingDescription}/>
      <div className={styles.loadingDescription}/>
    </div>
  </div>);
}