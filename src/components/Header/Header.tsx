'use client';

import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
// import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import Image from 'next/image';
import { SearchIcon } from '@/assets/SVGs';
import Breadcrumbs from '@/components/Header/Breadcrumbs';

type HeaderProps = {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
};

const Header = (props: HeaderProps) => {
  return (
    <header className="sticky h-22 top-0 z-999 bg-white dark:bg-grey-900">
      <div className="flex flex-grow items-center justify-between px-10 py-6">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={32}
              height={32}
              src={'/images/logo/logo-icon.svg'}
              alt="Logo"
            />
          </Link>
        </div>

        {/* search bar is not functional */}
        <div className="hidden sm:block">
          <form>
            <div className="relative flex">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                {SearchIcon}
              </div>
              <input
                type="text"
                placeholder=""
                className="w-full pl-9 pr-4 bg-transparent text-grey-600 dark:text-grey-300 body1 focus:outline-none xl:w-125"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeToggle />

            {/* <DropdownNotification /> */}
          </ul>

          <DropdownUser />
        </div>
      </div>
      <Breadcrumbs
        className="px-4 pb-2 text-grey-600 dark:text-grey-300"
        root="Home"
        separator={<p>&#8226;</p>}
        pathComponentClassName="hover:underline mx-2 font-bold"
        capitalizePathComponents
      />
    </header>
  );
};

export default Header;
