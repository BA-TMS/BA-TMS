'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import CustomerForm from '@/components/Forms/Customer/CustomerForm';

// this is a regular page for /add-customer (not a modal)

export default function AddCustomerReview() {
  return (
    <FullPageFormContainer title="Add Customer">
      <CustomerForm />
    </FullPageFormContainer>
  );
}
