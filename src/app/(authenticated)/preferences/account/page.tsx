'use client';

import { ContextProvider } from '@/context/modalContext';
import AccountForm from '@/components/Forms/Preferences/AccountForm';

export default () => {
  return (
    <ContextProvider>
      <AccountForm />
    </ContextProvider>
  );
};
