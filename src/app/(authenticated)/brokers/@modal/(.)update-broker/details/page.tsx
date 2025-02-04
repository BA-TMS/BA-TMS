'use client';

import Modal from '@ui/Modal/Modal';
import CustomsBrokerForm from '@/components/Forms/CustomsBroker/CustomsBrokerForm';

// this is an intercepting route that builds a modal

export default function UpdateBrokerDetailsModal() {
  return (
    <Modal title={'Update Customs Broker'}>
      <CustomsBrokerForm />
    </Modal>
  );
}
