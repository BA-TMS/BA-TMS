/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from 'react';

// this is a context to avoid prop drilling through pages/ modals/ forms

interface ThemeProviderProps {
  children: React.ReactNode;
}

// default values are initial state to provide
export const ModalContext = createContext({
  isOpen: false,
  data: null,
  toggleOpen: (param?: any) => {},
});

export const ContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  // how we open/ close said modal
  // optional data if we are dealing with form updates
  function toggleOpen(data = null) {
    if (data !== null) {
      setData(data);
      console.log('toggle modal data', data);
    }
    setIsOpen(!isOpen);
  }

  return (
    <ModalContext.Provider value={{ isOpen, toggleOpen, data }}>
      {children}
    </ModalContext.Provider>
  );
};
