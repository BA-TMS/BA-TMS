'use client';

// are we implementing this anywhere?

// @mui
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
//
// import useLocales from './useLocales';

// testing
// language
import { allLangs, defaultLang } from './config-lang';
// utils
import localStorageAvailable from '../../utils/localStorageAvailable';
// components
import { useSettingsContext } from '../settings/page';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeLocalization({ children }: Props) {
  // theme color
  const outerTheme = useTheme();

  // getting current language
  const storageAvailable = localStorageAvailable();

  const langStorage =
    storageAvailable && typeof window !== 'undefined'
      ? localStorage.getItem('i18nextLng')
      : '';

  const currentLang =
    allLangs.find((_lang) => _lang.value === langStorage) || defaultLang;
  console.log('ThemeLocalization Language', currentLang);

  // creating MUI Theme
  // outerTheme is theme object
  const theme = createTheme(outerTheme, currentLang.systemValue);
  console.log('theme', theme);

  // wrap ThemeProvider around parts of the app to apply theme changes based on language
  // this is not the context for language
  return <ThemeProvider theme={theme}> {children} </ThemeProvider>;
}
