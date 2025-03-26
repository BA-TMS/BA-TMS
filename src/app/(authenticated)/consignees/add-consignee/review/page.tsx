'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import ConsigneeReviewForm from '@/components/Forms/Consignee/ConsigneeReview';

export default function AddConsigneeReview() {
  return (
    <FullPageFormContainer title={'Add Consignee'}>
      <ConsigneeReviewForm />
    </FullPageFormContainer>
  );
}
