'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AddressBookIcon,
  LogoutIcon,
  SettingsIcon,
  UserIcon,
} from '@/assets/SVGs';
import { createClient } from '@util/supabase/client';
import { useRouter } from 'next/navigation';
import User01 from '@/assets/User01.jpg'; // replace with user uploaded image

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<HTMLAnchorElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <div className="relative w-10 h-10">
          <Image
            fill={true}
            src={User01}
            alt="User Profile Photo"
            className="rounded-full object-cover"
          />
        </div>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-lg border text-grey-600 dark:text-white bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-700 ${
          dropdownOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b px-6 py-7.5 border-grey-200 dark:border-grey-700">
          <li>
            <Link
              href="/profile"
              className="flex items-center gap-3.5 body2 duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              {UserIcon}
              My Profile
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3.5 body2 duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              {AddressBookIcon}
              My Contacts
            </Link>
          </li>
          <li>
            <Link
              href="/user/settings"
              className="flex items-center gap-3.5 body2 duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              {SettingsIcon}
              Account Settings
            </Link>
          </li>
        </ul>
        <button
          onClick={signOut}
          className="flex items-center gap-3.5 py-4 px-6 body2 duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          {LogoutIcon}
          Log Out
        </button>
      </div>

      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
