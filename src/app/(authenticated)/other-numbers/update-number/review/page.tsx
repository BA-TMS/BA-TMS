'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import OtherNumReview from '@/components/Forms/OtherNumbers/OtherNumbersReview';

export default function UpdateNumReview() {
  return (
    <FullPageFormContainer title={'Update Other Number'}>
      <OtherNumReview />
    </FullPageFormContainer>
  );
}
