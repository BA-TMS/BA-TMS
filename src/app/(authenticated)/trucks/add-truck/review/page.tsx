'use client';

import CustomsBrokerReview from '@/components/Forms/CustomsBroker/CustomsBrokerReview';
import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';

export default function AddBrokerReview() {
  return (
    <FullPageFormContainer title={'Add Customs Broker'}>
      <CustomsBrokerReview />
    </FullPageFormContainer>
  );
}
