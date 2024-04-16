'use client';

import { ContextProvider } from '@/Context/modalContext';
import Users from '@/components/Table/Users';

const UserPage = () => {
  return (
    <ContextProvider>
      <Users />
    </ContextProvider>
  );
};

export default UserPage;
