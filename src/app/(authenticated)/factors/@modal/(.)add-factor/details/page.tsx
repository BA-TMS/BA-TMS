'use client';

import Modal from '@ui/Modal/Modal';
import FactoringCompanyForm from '@/components/Forms/Factor/FactoringCompanyForm';

// this is an intercepting route that builds a modal

export default function AddFactorDetailsModal() {
  return (
    <Modal title={'Add Factoring Company'}>
      <FactoringCompanyForm />
    </Modal>
  );
}
