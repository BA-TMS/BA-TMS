'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import DriverReviewForm from '@/components/Forms/Driver/DriverReview';

export default function UpdateDriverReview() {
  return (
    <FullPageFormContainer title="Update Driver">
      <DriverReviewForm />
    </FullPageFormContainer>
  );
}
