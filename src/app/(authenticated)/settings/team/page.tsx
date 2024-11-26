'use client';

import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/Context/userContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import Table from '@ui/Table/Table';
import TableSkeleton from '@ui/Table/TableSkeleton';
import TableHeaderBlank from '@ui/Table/TableHeaderBlank';
import Searchbar from '@/components/UI_Elements/Searchbar';
import Dropdown from '@/components/UI_Elements/Input/Dropdown';
import Button from '@ui/buttons/Button';
import { fetchTeam } from '@/store/slices/teamSlice';
import { TeamMember } from '@/types/teamTypes';

// this page will need some sort of protections
// made with parts of other components

// TODO: redux

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

const dropdownOptions: string[] = ['All', 'Name', 'Role', 'Status'];

export default function SettingsPage() {
  const { user } = useContext(UserContext);

  const orgName = user?.user_metadata.org_name;

  const [filteredValue, setFilteredValue] = useState<TeamMember[]>([]);
  const [searchValue, setSearchValue] = useState<string>(''); // search value
  const [searchField, setSearchField] = useState<string>('All'); // specific field if any

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const {
    items: team,
    status,
    // error,
  } = useSelector((state: RootState) => state.team);

  // get initial team
  useEffect(() => {
    dispatch(fetchTeam(orgName));
  }, [dispatch]);

  // Update filtered team
  useEffect(() => {
    let updatedTeam = [...team];
    console.log(updatedTeam);
    // updatedTeam = handleSearch(updatedTeam, searchValue, searchField);
    setFilteredValue(updatedTeam);
  }, [team, searchValue, searchField]);

  return (
    <>
      <TableHeaderBlank />
      <div className="h-26 px-5 py-6 flex gap-4 bg-white dark:bg-grey-900 border-x border-t border-grey-300 dark:border-grey-700">
        <Searchbar
          placeholder={'Search...'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // const value = e.target.value;
            // search(value); // update the search value
          }}
        />
        <Dropdown
          label={'Sort By'}
          options={dropdownOptions}
          searchField={() => {}} // update the field to search
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
          update={() => null}
          view={''}
        />
      )}
    </>
  );
}
