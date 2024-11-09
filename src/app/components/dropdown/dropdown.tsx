import React, { useState, useRef, useContext, useEffect, useCallback } from 'react';
import { DropdownOption, DropDownValue } from '../../interfaces/components/dropdown/dropdown';
import styles from './dropdown.module.css';
import { overlayContext } from '../overlayContext/overlayContext';

export default function DropDown(props: { options: DropdownOption[], defaultValue: DropDownValue , onChange: (value: DropDownValue) => void, openUp?: boolean, open?: boolean, onClose?: () => void }): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [delayedOpen, setDelayedOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropDownValue>();
  const timer = useRef<NodeJS.Timeout>();
  const overlay = useContext(overlayContext);

  const setOpen = useCallback((state: boolean) => {
    setIsOpen(state);
    overlay.setShowingOverlay(state);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setDelayedOpen(state);
    }, state ? 1 : 250);
    if (!state && props.onClose) props.onClose();
  }, [overlay, props]);

  useEffect(() => {
    setOpen(props.open);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  return (
    <>
      <div className={`${styles.closeBox} ${isOpen ? styles.open : ''} ${delayedOpen ? styles.dopen : ''}`} onClick={() => { setOpen(false); }}></div>
      <div className={`${styles.dropDownBox} ${isOpen ? styles.open : ''} ${delayedOpen ? styles.dopen : ''} ${props.openUp ? styles.openUp : ''}`}>
        <button className={`${styles.option} ${styles.currentOption}`} onClick={() => { setOpen(!isOpen); }}><span className={styles.currentTitle}>{props.options.find((item) => item.value === (selectedItem ?? props.defaultValue ?? props.options[0].value))?.text}</span><div className={styles.arrow}/></button>
        <div className={styles.selection}>
          {props.options.map((item) => {
            return (<button className={styles.option} key={`DROPDOWN-${item.value}-${Date.now()}`} disabled={(selectedItem ?? props.defaultValue ?? props.options[0].value) === item.value} onClick={() => {
              setSelectedItem(item.value);
              props.onChange(item.value);
              setOpen(false);
            }}>
              <span className={styles.entryText}>{item.text}</span>
            </button>);
          })}
        </div>
      </div>
    </>
  );
}