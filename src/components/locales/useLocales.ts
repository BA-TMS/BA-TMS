'use client';

import { useTranslation } from 'react-i18next';
// utils
import localStorageAvailable from '../../utils/localStorageAvailable';
// components
import { useSettingsContext } from '../settings/page';
//
import { allLangs, defaultLang } from './config-lang';

// ----------------------------------------------------------------------
// this is a custom hook
// not sure if we will end up needing it
// provides access to the i18n object and translation function (t)
// looks like this initializes it?

export default function useLocales() {
  // useTranslation is a hook from react-i18next
  // The purpose of this hook is to enable translation functionality in a React component
  // how can we use a hook in a custom hook?
  const { i18n, t: translate } = useTranslation();

  const { onChangeDirectionByLang } = useSettingsContext();

  const storageAvailable = localStorageAvailable();

  const langStorage =
    storageAvailable && typeof window !== 'undefined'
      ? localStorage.getItem('i18nextLng')
      : '';

  const currentLang =
    allLangs.find((_lang) => _lang.value === langStorage) || defaultLang;

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang);
    onChangeDirectionByLang(newlang);
  };

  // returning an object
  return {
    onChangeLang: handleChangeLanguage,
    translate: (text: any, options?: any) => String(translate(text, options)),
    currentLang,
    allLangs,
  };
}
