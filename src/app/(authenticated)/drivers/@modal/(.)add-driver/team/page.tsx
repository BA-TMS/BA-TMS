'use client';

import Modal from '@ui/Modal/Modal';
import DriverTwoForm from '@/components/Forms/Driver/DriverTwo';

// this is an intercepting route that builds a modal

export default function AddDriverTeamModal() {
  return (
    <Modal title={'Add Second Driver'}>
      <DriverTwoForm />
    </Modal>
  );
}
