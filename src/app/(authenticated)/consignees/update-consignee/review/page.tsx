'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import ConsigneeReviewForm from '@/components/Forms/Consignee/ConsigneeReview';

// this is an intercepting route that builds a modal

export default function UpdateConsigneeReview() {
  return (
    <FullPageFormContainer title={'Update Consignee'}>
      <ConsigneeReviewForm />
    </FullPageFormContainer>
  );
}
