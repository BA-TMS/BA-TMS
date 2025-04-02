'use client';

import { ContextProvider } from '@/context/modalContext';
import AccountForm from '@/components/Forms/Preferences/AccountForm';

const AccountPage = () => {
  return (
    <ContextProvider>
      <AccountForm />
    </ContextProvider>
  );
};

export default AccountPage;
