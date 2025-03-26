'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import DriverReviewForm from '@/components/Forms/Driver/DriverReview';

export default function AddDriverReview() {
  return (
    <FullPageFormContainer title="Add Driver">
      <DriverReviewForm />
    </FullPageFormContainer>
  );
}
