'use client';

import Modal from '@ui/Modal/Modal';
import FactoringCompanyForm from '@/components/Forms/Factor/FactoringCompanyDetails';

// this is an intercepting route that builds a modal

export default function UpdateFactorDetailsModal() {
  return (
    <Modal title={'Update Factoring Company'}>
      <FactoringCompanyForm />
    </Modal>
  );
}
