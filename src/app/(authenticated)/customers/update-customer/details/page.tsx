'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import CustomerDetails from '@/components/Forms/Customer/CustomerDetails';

// this is a regular page for /add-customer (not a modal)

export default function UpdateCustomerDetails() {
  return (
    <FullPageFormContainer title="Update Customer">
      <CustomerDetails />
    </FullPageFormContainer>
  );
}
