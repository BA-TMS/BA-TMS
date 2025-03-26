'use client';

import Modal from '@ui/Modal/Modal';
import DriverTwoForm from '@/components/Forms/Driver/DriverTwo';

// this is an intercepting route that builds a modal

export default function UpdateDriverTeamModal() {
  return (
    <Modal title={'Update Second Driver'}>
      <DriverTwoForm />
    </Modal>
  );
}
