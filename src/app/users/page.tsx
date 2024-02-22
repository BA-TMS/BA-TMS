'use client';

import { ContextProvider } from '@/Context/modalContext';
import UserForm from '@/components/Forms/UserForm';

const UserPage = () => {
  return (
    <ContextProvider>
      <UserForm></UserForm>
    </ContextProvider>
  );
};

export default UserPage;
