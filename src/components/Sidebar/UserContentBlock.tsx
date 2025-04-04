'use client';

import Image from 'next/image';
import User01 from '@/assets/user1.jpg';

interface UserContentProps {
  firstName: string | null;
  lastName: string | null;
  role: keyof typeof roleMap;
}

const roleMap = {
  DISPATCHER: 'Dispatcher',
  SALES_REP: 'Sales Rep',
  ADMIN: 'Admin',
  OWNER: 'Owner',
};

const UserContentBlock = ({ firstName, lastName, role }: UserContentProps) => {
  return (
    <section className="flex items-center bg-grey-200 dark:bg-grey-700 w-60 h-19 rounded-xl py-4 px-5 overflow-hidden">
      <div className="relative w-10 h-10">
        <Image
          fill={true}
          src={User01}
          alt="User Profile Photo"
          className="rounded-full object-cover"
        />
      </div>
      <div className="ml-4">
        <p className="subtitle2 text-black dark:text-white">
          {`${firstName} ${lastName}`}
        </p>
        <p className="font-public font-normal text-text-sm text-grey-500 ">
          {role ? roleMap[role] : 'User'}
        </p>
      </div>
    </section>
  );
};

export default UserContentBlock;
