'use client';

import Modal from '@ui/Modal/Modal';
import TrailerDetails from '@/components/Forms/Trailer/TrailerDetails';

// this is an intercepting route that builds a modal

export default function UpdateTrailerDetailsModal() {
  return (
    <Modal title={'Update Trailer'}>
      <TrailerDetails />
    </Modal>
  );
}
