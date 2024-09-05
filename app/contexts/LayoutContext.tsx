'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type LayoutContextType = {
  hiddenRows: boolean;
  setHiddenRows: (hidden: boolean) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [hiddenRows, setHiddenRows] = useState<boolean>(false);

  return (
    <LayoutContext.Provider value={{ hiddenRows, setHiddenRows }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};
