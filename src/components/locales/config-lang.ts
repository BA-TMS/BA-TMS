'use client';

// @mui
import { enUS, esES } from '@mui/material/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_us.svg',
  },
  {
    label: 'Spanish',
    value: 'es',
    systemValue: esES,
    icon: '/assets/icons/flags/ic_flag_es.svg',
  },
];

export const defaultLang = allLangs[0]; // English

// This file somehow handles language localization- how and what exactly is it doing
// allLangs/ defaultLang was used in the useLocales custom hook
