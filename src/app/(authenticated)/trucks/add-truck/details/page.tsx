'use client';

import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import CustomsBrokerForm from '@/components/Forms/CustomsBroker/CustomsBrokerForm';

export default function AddBrokerDetails() {
  return (
    <FullPageFormContainer title="Add Customs Broker">
      <CustomsBrokerForm />
    </FullPageFormContainer>
  );
}
