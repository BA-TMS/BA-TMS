'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import OtherNumbersForm from '@/components/Forms/OtherNumbers/OtherNumbersForm';

export default function AddNumDetails() {
  return (
    <FullPageFormContainer title="Add Other Number">
      <OtherNumbersForm />
    </FullPageFormContainer>
  );
}
