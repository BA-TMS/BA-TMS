import { createContext, useContext, useState, ReactNode } from 'react';
import localStorageAvailable from '@/utils/localStorageAvailable';
import { allLangs, defaultLang } from './config-lang';

interface Locale {
  value: string;
  icon: string;
  label: string;
}

interface LocalesProviderProps {
  children: ReactNode;
}

interface LocalesContextProps {
  currentLocale: Locale;
  toggleLocale: () => void;
}

// there is probably a better default value
// but I don't understand yet
export const LocalesContext = createContext<LocalesContextProps | undefined>(
  undefined
);

export const LocalesProvider: React.FC<LocalesProviderProps> = ({
  children,
}) => {
  const [currentLocale, setCurrentLocale] = useState(defaultLang);
  console.log('default lang in context', defaultLang.value);

  // getting current language
  const storageAvailable = localStorageAvailable();

  const langStorage =
    storageAvailable && typeof window !== 'undefined'
      ? localStorage.getItem('i18nextLng')
      : '';

  // looking in allLangs to find calue that matches langStorage
  const currentLang =
    allLangs.find((_lang) => _lang.value === langStorage) || defaultLang;

  // this is not quite what we want, but is placeholder
  function toggleLocale() {
    setCurrentLocale(currentLang);
  }

  console.log('currentLocale', currentLocale.value);

  return (
    <LocalesContext.Provider value={{ currentLocale, toggleLocale }}>
      {children}
    </LocalesContext.Provider>
  );
};

// custom hook
// export const useLocale = () => useContext(LocalesContext);
export const useLocale = () => {
  const context = useContext(LocalesContext);

  if (!context) {
    throw new Error('useLocale must be used within a LocalesProvider');
  }

  return context;
};
