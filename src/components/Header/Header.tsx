'use client';

import DarkModeToggle from './DarkModeToggle';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import Image from 'next/image';
import { SearchIcon } from '@/assets/icons';
import Breadcrumbs from '@/components/Header/Breadcrumbs';
import USFlag from '@/assets/flags/Flag_US.svg';

type HeaderProps = {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
};

const Header = (props: HeaderProps) => {
  return (
    <header className="sticky h-22 top-0 z-999 bg-white dark:bg-grey-900">
      <div className="flex items-center justify-between px-10 py-6">
        <div className="flex items-center w-10 mr-10 gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 border border-none p-1.5 lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-full rounded-sm bg-grey-600 dark:bg-grey-300 duration-200 ease-in-out ${
                    props.sidebarOpen && 'w-0'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-full rounded-sm bg-grey-600 dark:bg-grey-300 duration-200 ease-in-out ${
                    props.sidebarOpen && 'w-0'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-full rounded-sm bg-grey-600 dark:bg-grey-300 duration-200 ease-in-out ${
                    props.sidebarOpen && 'w-0'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- End Hamburger Toggle BTN --> */}
        </div>

        {/* search bar is not functional - should we also make separate component? */}
        <form className="w-full">
          <div className="relative flex">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              {SearchIcon}
            </div>
            <input
              type="text"
              placeholder=""
              className="w-full pl-9 pr-4 bg-transparent text-grey-600 dark:text-grey-300 body1 focus:outline-none"
            />
          </div>
        </form>

        <div className="flex items-center gap-3">
          <DarkModeToggle />

          <div className="w-10 px-1.5 py-2.5">
            <Image src={USFlag} alt="Flag" />
          </div>

          <DropdownNotification />

          <DropdownUser />
        </div>
      </div>
      <Breadcrumbs
        className="px-4 pb-2 text-grey-600 dark:text-grey-30"
        root="Home"
        separator={<p>&#8226;</p>}
        pathComponentClassName="hover:underline mx-2 font-bold"
        capitalizePathComponents
      />
    </header>
  );
};

export default Header;
