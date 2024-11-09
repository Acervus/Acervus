'use client';
import React, { useEffect } from 'react';
import { createContext, useState } from 'react';

export const overlayContext = createContext({} as { showingOverlay: boolean | undefined, setShowingOverlay: (showing: boolean) => void });

export function Overlay({ children }: { children: React.ReactNode }) {
  const [showingOverlay, setShowingOverlay] = useState<boolean>(false);
  const [states, setStates] = useState<number>(0);

  function addToStates(state: boolean, force?: boolean): void {
    if (force) {
      setStates(0);
      setShowingOverlay(state);
      return;
    }
    if (state) {
      setStates(states + 1);
      setShowingOverlay(true);
    } else {
      setShowingOverlay((states - 1) > 0);
      setStates(states > 0 ? states -1 : 0);
    }
  }

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) body.style.overflow = showingOverlay ? 'hidden' : 'auto';
  }, [showingOverlay]);

  return (
    <overlayContext.Provider value={{ showingOverlay, setShowingOverlay: addToStates }}>
      {children}
    </overlayContext.Provider>
  );
}
