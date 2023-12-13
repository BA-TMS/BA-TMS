'use client';

// components
import { SettingsValueProps } from './types';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const defaultSettings: SettingsValueProps = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeContrast: 'bold',
  themeLayout: 'vertical',
  themeColorPresets: 'cyan',
  themeStretch: true,
};
