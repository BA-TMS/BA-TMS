'use client';

import CustomsBrokerReview from '@/components/Forms/CustomsBroker/CustomsBrokerReview';
import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';

export default function UpdateBrokerReview() {
  return (
    <FullPageFormContainer title={'Update Customs Broker'}>
      <CustomsBrokerReview />
    </FullPageFormContainer>
  );
}
