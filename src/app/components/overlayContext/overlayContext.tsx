'use client';
import React, { useEffect } from 'react';
import { createContext, useState } from 'react';

export const overlayContext = createContext({} as { showingOverlay: boolean | undefined, setShowingOverlay: (showing: boolean) => void });

export function Overlay({ children }: { children: React.ReactNode }) {
  const [showingOverlay, setShowingOverlay] = useState<boolean>(false);
  let states = 0;

  function addToStates(state: boolean, force?: boolean): void {
    if (force) {
      states = 0;
      setShowingOverlay(state);
    }
    if (state) {
      states++;
      setShowingOverlay(true);
    } else {
      states--;
      setShowingOverlay(states > 0);
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