'use client';

import Carriers from '../../../components/Table/Carrier';
import { ContextProvider } from '@/Context/modalContext';

const CarrierPage = () => {
  return (
    <ContextProvider>
      <Carriers />
    </ContextProvider>
  );
};

export default CarrierPage;
