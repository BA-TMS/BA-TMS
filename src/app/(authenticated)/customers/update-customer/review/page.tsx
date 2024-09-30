'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import CustomerForm from '@/components/Forms/Customer/CustomerForm';

export default function UpdateCustomerReview() {
  return (
    <FullPageFormContainer title="Update Customer">
      <CustomerForm />
    </FullPageFormContainer>
  );
}
