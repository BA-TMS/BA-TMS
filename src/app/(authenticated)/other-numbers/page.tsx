'use client';

import { ContextProvider } from '@/context/modalContext';
import OtherNumbersForm from '@/components/Forms/OtherNumbersForm';

const OtherNumbersPage = () => {
  return (
    <ContextProvider>
      <OtherNumbersForm></OtherNumbersForm>
    </ContextProvider>
  );
};

export default OtherNumbersPage;
