import React, { createContext, useState } from 'react';

// this is a context to avoid prop drilling through pages/ modals/ forms

interface ThemeProviderProps {
  children: React.ReactNode;
}

// default values are initial state to provide
export const ModalContext = createContext({
  isOpen: false,
  toggleOpen: () => {},
});

export const ContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // how we open/ close said modal
  function toggleOpen() {
    setIsOpen(!isOpen);
    console.log('toggle open function triggered');
  }

  return (
    <ModalContext.Provider value={{ isOpen, toggleOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
