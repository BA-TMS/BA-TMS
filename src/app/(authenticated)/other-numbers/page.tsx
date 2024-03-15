'use client';

import { ContextProvider } from '@/Context/modalContext';
import OtherNumbersForm from '@/components/Forms/OtherNumbersForm';

const OtherNumbersPage = () => {
  return (
    <ContextProvider>
      <OtherNumbersForm></OtherNumbersForm>
    </ContextProvider>
  );
};

export default OtherNumbersPage;
