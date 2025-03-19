'use client';

import Modal from '@ui/Modal/Modal';
import TrailerDetails from '@/components/Forms/Trailer/TrailerDetails';

// this is an intercepting route that builds a modal

export default function AddTrailerDetailsModal() {
  return (
    <Modal title={'Add Trailer'}>
      <TrailerDetails />
    </Modal>
  );
}
