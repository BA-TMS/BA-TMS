'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import TrailerReview from '@/components/Forms/Trailer/TrailerReview';

export default function UpdateTrailerReview() {
  return (
    <FullPageFormContainer title={'Update Trailer'}>
      <TrailerReview />
    </FullPageFormContainer>
  );
}
