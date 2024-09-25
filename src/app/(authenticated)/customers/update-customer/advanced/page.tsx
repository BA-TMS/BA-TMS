'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import AdvancedCustomerDetails from '@/components/Forms/Customer/CustomerAdvanced';

// this is a regular page for /add-customer (not a modal)

export default function UpdateCustomerAdvanced() {
  return (
    <FullPageFormContainer title="Update Customer">
      <AdvancedCustomerDetails />
    </FullPageFormContainer>
  );
}
