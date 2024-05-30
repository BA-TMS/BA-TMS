import useColorMode from '../../hooks/useColorMode';
import { DarkModeIcon, LightModeIcon } from '@/assets/SVGs';

const DarkModeToggle = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <button
      role="switch"
      aria-checked={colorMode === 'dark'}
      onClick={() => {
        if (typeof setColorMode === 'function') {
          setColorMode(colorMode === 'light' ? 'dark' : 'light');
        }
      }}
      className={`relative m-0 block h-7.5 w-14 rounded-full ${
        colorMode === 'dark' ? 'bg-primary' : 'bg-grey-200'
      }`}
    >
      <span
        className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
          colorMode === 'dark' && '!right-[3px] !translate-x-full'
        }`}
      >
        <span className={`${colorMode === 'dark' ? 'hidden' : 'inline-block'}`}>
          {LightModeIcon}
        </span>
        <span className={`${colorMode === 'dark' ? 'inline-block' : 'hidden'}`}>
          {DarkModeIcon}
        </span>
      </span>
    </button>
  );
};

export default DarkModeToggle;
