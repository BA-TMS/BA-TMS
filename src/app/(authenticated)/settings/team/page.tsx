'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Table from '@ui/Table/Table';
import TableSkeleton from '@ui/Table/TableSkeleton';
import TableHeaderBlank from '@ui/Table/TableHeaderBlank';
import Searchbar from '@/components/UI_Elements/Searchbar';
import Dropdown from '@/components/UI_Elements/Input/Dropdown';
import Button from '@/components/UI_Elements/buttons/Button';
import { TeamMember } from '@/types/teamTypes';

// this page will need some sort of protections

const columns = [
  { field: 'firstName', headerName: 'First Name' },
  { field: 'lastName', headerName: 'Last Name' },
  { field: 'email', headerName: 'Email Address' },
  {
    field: 'role',
    headerName: 'Role',
  },
  {
    field: 'status',
    headerName: 'Status',
  },
];

export default function SettingsPage() {
  const [filteredValue, setFilteredValue] = useState<TeamMember[]>([]);
  const [searchValue, setSearchValue] = useState<string>(''); // search value
  const [searchField, setSearchField] = useState<string>('All'); // specific field if any

  const router = useRouter();

  const {
    items: team,
    status,
    // error,
  } = useSelector((state: RootState) => state.team);

  // update specific field to search
  // currently only handling status
  const updateField = (field: string) => {
    setSearchField(field);
  };

  // search
  const handleSearch = (users: TeamMember[], value: string, status: string) => {
    // status to uppercase
    const userStatus = status?.toUpperCase();

    // filter by status (if it's "Active" or "Inactive")
    let filteredUsers = users;

    if (userStatus === 'ACTIVE' || userStatus === 'INACTIVE') {
      filteredUsers = users.filter(
        (user) => user.Permissions?.status === userStatus
      );
    }

    // If no search value, return the filtered list by status
    if (!value) {
      return filteredUsers;
    }

    // search across all fields with the given value
    if (status === 'All') {
      return filteredUsers.filter((user) =>
        Object.values(user).some((userField) =>
          userField?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    // If status is specific (like "Active"), apply search value filtering
    return filteredUsers.filter((user) =>
      Object.values(user).some((userField) =>
        userField?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  // update team member
  const updateTeam = async (id: string) => {
    router.push(`/settings/team/update-user/${id}`);
  };

  // Update filtered team
  useEffect(() => {
    let updatedTeam = [...team];
    updatedTeam = handleSearch(updatedTeam, searchValue, searchField);
    setFilteredValue(updatedTeam);
  }, [team, searchValue, searchField]);

  return (
    <>
      <TableHeaderBlank />
      <div className="h-26 px-5 py-6 flex gap-4 bg-white dark:bg-grey-900 border-x border-t border-grey-300 dark:border-grey-700">
        <Searchbar
          placeholder={'Search...'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearchValue(value);
          }}
        />
        <Dropdown
          label={'Status'}
          options={['Active', 'Inactive', 'All']}
          searchField={updateField} // update the field to narrow search
        />

        <div className="relative flex items-center w-50">
          <Link href="/settings/team/add-user">
            <Button>Add User</Button>
          </Link>
        </div>
      </div>

      {status === 'loading' ? (
        <TableSkeleton columns={columns} />
      ) : (
        <Table
          columns={columns}
          data={filteredValue}
          update={updateTeam}
          view={'/settings/team/view/'}
        />
      )}
    </>
  );
}
