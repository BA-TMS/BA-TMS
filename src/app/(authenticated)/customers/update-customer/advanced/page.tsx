'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import AdvancedCustomerDetails from '@/components/Forms/Customer/CustomerAdvanced';

export default function UpdateCustomerAdvanced() {
  return (
    <FullPageFormContainer title="Update Customer">
      <AdvancedCustomerDetails />
    </FullPageFormContainer>
  );
}
