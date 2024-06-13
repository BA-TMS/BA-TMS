'use client';
import { ReactNode, useState, useContext } from 'react';
//import 'primereact/resources/themes/lara-light-indigo/theme.css';

// TESTING
import Input from '../../../../../components/Settings-General/Input';
import Form, { type FormHandle } from '@/components/Settings-General/Form';
//import Button from '@/components/Settings-General/Button';
import { useRef } from 'react';
import ToggleButton from '@/components/Controls/ToggleButton';
import Popup from 'reactjs-popup';
import TableActionsPopover from '@/components/UI_Elements/Popovers/TableActions';
import TablePagination from '@/components/UI_Elements/Pagination';
import Table from '@/components/UI_Elements/Table';
import Searchbar from '@/components/UI_Elements/Searchbar';

import { ModalContext } from '@/Context/modalContext';
import FormModal from '@/components/Modals/FormModal';
import MemberForm from '@/components/Forms/MemberForm';
import Button from '@ui/buttons/Button';

type Member = {
  avatar: string;
  name: string;
  email: string;
  role: string;
  authentication: string;
  lastLogin: string;
  status: string;
};

const secondaryNavigation = [
  { name: 'Account', href: '/user/settings', current: true },
  { name: 'Notifications', href: '#', current: false },
  { name: 'Billing', href: '#', current: false },
  { name: 'Teams', href: '#', current: false },
];

type Members = Member[];

const columns = [
  { field: 'name', headerName: 'Member' },
  { field: 'email', headerName: 'Email Address' },
  {
    field: 'role',
    headerName: 'Roles',
    cellRenderer: (role, row) => (
      <span className="inline-block rounded py-0.5 px-2.5 text-sm font-medium text-meta-3 bg-meta-3/[0.08]">
        {role}
      </span>
    ),
  },
  { field: 'lastLogin', headerName: 'Last Login' },
];

const placeholderMembers = [
  {
    avatar: '/images/user/user-17.png',
    name: 'Andrei Statescu',
    email: 'Andrei@a2zport.com',
    role: 'Developer',
    authentication: 'Yes',
    lastLogin: 'Jan 22, 2024, 8:33 PM',
    status: 'active',
  },
  {
    avatar: '/images/user/user-18.png',
    name: 'Daniel Lepe',
    email: 'Dan@example.com',
    role: 'Manager',
    authentication: 'No',
    lastLogin: 'Feb 15, 2024, 1:45 PM',
    status: 'active',
  },
  {
    avatar: '/images/user/user-19.png',
    name: 'Jacob Reola',
    email: 'Jacob@example.com',
    role: 'Designer',
    authentication: 'Yes',
    lastLogin: 'Mar 10, 2024, 10:02 AM',
    status: 'lost',
  },
  {
    avatar: '/images/user/user-20.png',
    name: 'Josh Reola',
    email: 'Josh@example.com',
    role: 'Engineer',
    authentication: 'No',
    lastLogin: 'Apr 5, 2024, 12:54 PM',
    status: 'active',
  },
  {
    avatar: '/images/user/user-21.png',
    name: 'Mrutunjay Singh',
    email: 'Mrutunjay@example.com',
    role: 'Analyst',
    authentication: 'Yes',
    lastLogin: 'May 1, 2024, 5:30 PM',
    status: 'lost',
  },
  {
    avatar: '/images/user/user-22.png',
    name: 'Leonardo Cabral',
    email: 'Leonardo@example.com',
    role: 'Tester',
    authentication: 'No',
    lastLogin: 'Jun 20, 2024, 3:45 PM',
    status: 'active',
  },
  {
    avatar: '/images/user/user-23.png',
    name: 'example',
    email: 'example@example.com',
    role: 'Tester',
    authentication: 'No',
    lastLogin: 'Jun 16, 2024, 1:40 PM',
    status: 'active',
  },
];

export default function SettingsPage() {
  const teamMembers: Members = placeholderMembers;

  const [filteredMembers, setFilteredMembers] = useState<Members>(teamMembers);

  const { toggleOpen } = useContext(ModalContext);

  const handleClick = () => {
    console.log('Clicked');
    toggleOpen();
  };

  function updateFilteredMembers(filter: string) {
    const filteredMembers = teamMembers.filter(
      (member) =>
        member.name?.toLowerCase().includes(filter.toLowerCase()) ||
        member.email?.toLowerCase().includes(filter.toLowerCase())
    );
    // Update the team members list with the filtered results
    // (Assuming you have a state variable to store the filtered members)
    setFilteredMembers(filteredMembers);
  }

  return (
    <>
      {/* Tabs */}
      <div>
        {/* removed dlassName="border-b border-white/5" */}
        <div>
          {/* Secondary navigation */}
          <nav className="flex overflow-x-auto py-4">
            <ul
              role="list"
              className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
            >
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={item.current ? 'text-indigo-400' : ''}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Filter */}
      <div className="rounded-t-lg space-between border border-stroke bg-white dark:border-strokedark dark:bg-black p-6">
        <Searchbar
          placeholder="Search by name or email..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            updateFilteredMembers(value);
          }}
        />

        {/* End Filter Block */}

        {/* New Member Block */}
        <Button onClick={handleClick}>+ New Member</Button>
        <FormModal>
          <MemberForm />
        </FormModal>
      </div>
      {/* End New Member Block */}

      {/* Data Table Block */}
      <Table
        columns={columns.map((member) => ({
          field: member.field, // Assuming 'field' is a unique identifier for columns
          headerName: member.headerName,
          cellRenderer: member.cellRenderer,
        }))}
        data={filteredMembers}
      />
      {/* End Data Table Block */}
    </>
  );
}
