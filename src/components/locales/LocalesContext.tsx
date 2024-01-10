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
// import { useCookies } from 'react-cookie'; // do we need?
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// import { getOptions, languages, cookieName } from './settings' // what is this in our code?

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

// there is probably a better default value we could use here
export const LocalesContext = createContext<LocalesContextProps | undefined>(
  undefined
);

export const LocalesProvider: React.FC<LocalesProviderProps> = ({
  children,
}) => {
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLang);
  console.log('current locale state', defaultLang.value);

  // check if browser supports localStorage
  const storageAvailable = localStorageAvailable();

  // if we have localStorage and window is a browser
  // retrieve i18nextLng value - where is this value being put in localStorage?
  // otherwise langStorage is empty string
  const langStorage =
    storageAvailable && typeof window !== 'undefined'
      ? localStorage.getItem('i18nextLng')
      : '';

  // setting the currentLang
  // looking in allLangs to find value that matches langStorage or assign defaultLang (english)
  const currentLang =
    allLangs.find((_lang) => _lang.value === langStorage) || defaultLang;

  // update state once we have currentLang
  // setCurrentLocale(currentLang);

  // this is not quite what we want, but is placeholder for something that changes language if we want it
  function toggleLocale() {
    setCurrentLocale(currentLang);
  }

  console.log('currentLocale', currentLocale.value);

  // i18next instance
  const runsOnServerSide = typeof window === 'undefined';

  let lng = defaultLang.value;

  if (storageAvailable && typeof window !== 'undefined') {
    lng = localStorage.getItem('i18nextLng') || defaultLang.value;
  }

  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
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

  // function useTranslation(lng: any, ns: any, options: any) {
  //   // const [cookies, setCookie] = useCookies([cookieName]);
  //   const ret = useTranslationOrg(ns, options);
  //   const { i18n } = ret;
  //   if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
  //     i18n.changeLanguage(lng);
  //   } else {
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     useEffect(() => {
  //       if (activeLng === i18n.resolvedLanguage) return;
  //       setActiveLng(i18n.resolvedLanguage);
  //     }, [activeLng, i18n.resolvedLanguage]);
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     useEffect(() => {
  //       if (!lng || i18n.resolvedLanguage === lng) return;
  //       i18n.changeLanguage(lng);
  //     }, [lng, i18n]);
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     // useEffect(() => {
  //     //   if (cookies.i18next === lng) return;
  //     //   setCookie(cookieName, lng, { path: '/' });
  //     // }, [lng, cookies.i18next]);
  //   }
  //   return ret;
  // }

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
