'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import CustomerDetails from '@/components/Forms/Customer/CustomerDetails';

export default function UpdateCustomerDetails() {
  return (
    <FullPageFormContainer title="Update Customer">
      <CustomerDetails />
    </FullPageFormContainer>
  );
}
