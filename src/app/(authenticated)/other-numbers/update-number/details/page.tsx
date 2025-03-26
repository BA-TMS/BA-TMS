'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import OtherNumbersForm from '@/components/Forms/OtherNumbers/OtherNumbersForm';

export default function UpdateNumDetails() {
  return (
    <FullPageFormContainer title="Update Other Number">
      <OtherNumbersForm />
    </FullPageFormContainer>
  );
}
