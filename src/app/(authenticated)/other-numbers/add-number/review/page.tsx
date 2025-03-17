'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import OtherNumReview from '@/components/Forms/OtherNumbers/OtherNumbersReview';

export default function AddNumReview() {
  return (
    <FullPageFormContainer title={'Add Other Number'}>
      <OtherNumReview />
    </FullPageFormContainer>
  );
}
