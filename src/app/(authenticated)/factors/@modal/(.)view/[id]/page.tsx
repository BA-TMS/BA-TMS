'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import Modal from '@ui/Modal/Modal';
import { RootState } from '@/store/store';
import { FactorData } from '@/types/factorTypes';
import ViewFactoringCo from '@/components/Forms/Factor/ViewFactoringCo';

// page uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function ViewFactorModal() {
  const pathname = usePathname();

  // slice the pathname to get the id
  const factorId = pathname.split('/view/')[1];

  // use the id to pull from redux
  const factor = useSelector((state: RootState) =>
    state.factors.items.find((factor: FactorData) => factor.id === factorId)
  );

  return (
    <Modal title={'View Factoring Company'}>
      <ViewFactoringCo data={factor} />
    </Modal>
  );
}
