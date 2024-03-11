// test page for consignee

'use client';

import { ContextProvider } from '@/Context/modalContext';
import ConsigneeForm from '@/components/Forms/ConsigneeForm';

const ConsigneePage = () => {
  return (
    <ContextProvider>
      <ConsigneeForm></ConsigneeForm>
    </ContextProvider>
  );
};

export default ConsigneePage;
