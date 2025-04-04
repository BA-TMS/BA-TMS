import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useColorMode = () => {
  const userPrefers: boolean = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  // default to browser setting
  const [colorMode, setColorMode] = useLocalStorage(
    'color-theme',
    userPrefers ? 'dark' : 'light'
  );

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    colorMode === 'dark'
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
