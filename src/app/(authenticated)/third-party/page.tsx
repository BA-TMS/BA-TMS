'use client';

import { ContextProvider } from '@/Context/modalContext';
import ThirdParty from '@/components/Table/ThirdParty';

const ThirdPartyPage = () => {
  return (
    <ContextProvider>
      <ThirdParty />
    </ContextProvider>
  );
};

export default ThirdPartyPage;
