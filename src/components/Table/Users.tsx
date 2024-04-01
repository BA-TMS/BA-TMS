'use client';

import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '@/Context/modalContext';
import FormModal from '../Modals/FormModal';
import Table from './UI_Elements/Table';
import { getUsers } from '@/lib/dbActions';
import UserForm from '../Forms/UserForm';

type User = {
  email: string;
  password: string;
  orgId: string;
  role: string;
};

// this is passed to Table
const columns = [
  { field: 'email', headerName: 'Email' },
  { field: 'password', headerName: 'Password' },
  { field: 'orgId', headerName: 'Organization' },
  { field: 'role', headerName: 'Role' },
];

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const { toggleOpen } = useContext(ModalContext);

  const handleClick = () => {
    toggleOpen();
  };

  // data fetched and passed to Table
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <button
        onClick={handleClick}
        className="float-right rounded-md bg-primary py-3 px-9 font-medium text-white hover:bg-opacity-80"
      >
        Add User
      </button>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base leading-6 text-gray-900">Customs Brokers</h1>
          <p className="mt-2 text-md text-gray-700">All user information.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <FormModal>
            <UserForm />
          </FormModal>
        </div>
      </div>
      <Table columns={columns} data={users}></Table>
    </div>
  );
}
