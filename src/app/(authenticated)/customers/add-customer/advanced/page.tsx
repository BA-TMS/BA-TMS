'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import AdvancedCustomerDetails from '@/components/Forms/Customer/CustomerAdvanced';

// this is a regular page for /add-customer (not a modal)

export default function AddCustomerAdvanced() {
  return (
    <FullPageFormContainer title="Add Customer">
      <AdvancedCustomerDetails />
    </FullPageFormContainer>
  );
}
