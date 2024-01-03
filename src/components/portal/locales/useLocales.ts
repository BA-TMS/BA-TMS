'use client';

import { useTranslation } from 'react-i18next';
// utils
import localStorageAvailable from '../../../utils/localStorageAvailable';
// components
import { useSettingsContext } from '../../settings/page';
//
import { allLangs, defaultLang } from './config-lang';

// ----------------------------------------------------------------------

export default function useLocales() {
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

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text: any, options?: any) => String(translate(text, options)),
    currentLang,
    allLangs,
  };
}
