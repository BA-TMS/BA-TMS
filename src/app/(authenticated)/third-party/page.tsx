'use client';

import { ContextProvider } from '@/Context/modalContext';
import ThirdPartyForm from '@/components/Forms/ThirdPartyForm';

const ThirdPartyPage = () => {
  return (
    <ContextProvider>
      <ThirdPartyForm></ThirdPartyForm>
    </ContextProvider>
  );
};

export default ThirdPartyPage;
