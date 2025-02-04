'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import CustomsBrokerForm from '@/components/Forms/CustomsBroker/CustomsBrokerForm';

export default function UpdateBrokerDetails() {
  return (
    <FullPageFormContainer title="Update Customs Broker">
      <CustomsBrokerForm />
    </FullPageFormContainer>
  );
}
