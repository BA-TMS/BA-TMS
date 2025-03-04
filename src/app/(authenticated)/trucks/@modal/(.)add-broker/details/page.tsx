'use client';

import Modal from '@ui/Modal/Modal';
import CustomsBrokerForm from '@/components/Forms/CustomsBroker/CustomsBrokerForm';

// this is an intercepting route that builds a modal

export default function AddBrokerDetailsModal() {
  return (
    <Modal title={'Add Customs Broker'}>
      <CustomsBrokerForm />
    </Modal>
  );
}
