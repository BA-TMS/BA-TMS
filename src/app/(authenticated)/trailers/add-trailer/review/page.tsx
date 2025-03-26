'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import TrailerReview from '@/components/Forms/Trailer/TrailerReview';

export default function AddTrailerReview() {
  return (
    <FullPageFormContainer title={'Add Trailer'}>
      <TrailerReview />
    </FullPageFormContainer>
  );
}
