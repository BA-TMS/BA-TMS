import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import localStorageAvailable from '@/utils/localStorageAvailable';
import { allLangs, defaultLang } from './config-lang';
import i18next from 'i18next';
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from 'react-i18next';
// import resourcesToBackend from 'i18next-resources-to-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';

// translations
import enLocales from './langs/en';
import esLocales from './langs/es';

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

function initialState(): Locale {
  const storageAvailable = localStorageAvailable();

  // doing this manually without i18next LanguageDetector
  // detect browser language and slice
  const browserLng = navigator.language.slice(0, 2);
  localStorage.setItem('i18nextLng', browserLng);

  // if we have localStorage and window is a browser
  const langStorage =
    storageAvailable && typeof window !== 'undefined'
      ? localStorage.getItem('i18nextLng')
      : '';

  // setting the currentLang from allLangs array or assign defaultLang (english) if no match
  const currentLang =
    allLangs.find((_lang) => _lang.value === langStorage) || defaultLang;

  return currentLang;
}

// there is probably a better default value we could use here
export const LocalesContext = createContext<LocalesContextProps | undefined>(
  undefined
);

export const LocalesProvider: React.FC<LocalesProviderProps> = ({
  children,
}) => {
  const [currentLocale, setCurrentLocale] = useState<Locale>(initialState());
  console.log('current locale state', currentLocale);
  console.log('navigator language', navigator.language);

  // placeholder
  function toggleLocale() {
    // setCurrentLocale(currentLang);
  }

  console.log('currentLocale', currentLocale.value);

  // i18next instance
  const storageAvailable = localStorageAvailable();

  let lng = defaultLang.value;

  if (storageAvailable && typeof window !== 'undefined') {
    lng = localStorage.getItem('i18nextLng') || defaultLang.value;
  }

  i18next
    .use(initReactI18next)
    // .use(LanguageDetector) // this is what sets the i18nextLng in local storage
    .init({
      resources: {
        en: { translations: enLocales },
        es: { translations: esLocales },
      },
      lng,
      fallbackLng: defaultLang.value,
      debug: false,
      ns: ['translations'],
      defaultNS: 'translations',
      interpolation: {
        escapeValue: false,
      },
    });

  return (
    <LocalesContext.Provider value={{ currentLocale, toggleLocale }}>
      {children}
    </LocalesContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocalesContext);

  if (!context) {
    throw new Error('useLocale must be used within a LocalesProvider');
  }

  return context;
};
