import React, { createContext, useState } from 'react';

// this is a context to avoid prop drilling through pages/ modals/ forms

interface ThemeProviderProps {
  children: React.ReactNode;
}

// default values are initial state to provide
export const ModalContext = createContext({
  isOpen: false,
  toggleOpen: () => {},
  data: undefined,
  setData2: (data, cb) => {},
});

export const ContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // how we open/ close said modal
  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  const [data, setData] = useState<any>(undefined);

  function setData2(data, cb) {
    console.log("setData2's data:", data);
    setData(data);
  }

  return (
    <ModalContext.Provider value={{ isOpen, toggleOpen, data, setData2 }}>
      {children}
    </ModalContext.Provider>
  );
};
