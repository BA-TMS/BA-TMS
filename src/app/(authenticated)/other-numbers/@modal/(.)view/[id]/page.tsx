'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import Modal from '@ui/Modal/Modal';
import { RootState } from '@/store/store';
import { NumData } from '@/types/otherNumTypes';
import ViewOtherNumbers from '@/components/Forms/OtherNumbers/ViewOtherNumbers';

// page uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function ViewNumsModal() {
  const pathname = usePathname();

  // slice the pathname to get the id
  const otherNumId = pathname.split('/view/')[1];

  // use the id to pull from redux
  const otherNum = useSelector((state: RootState) =>
    state.otherNumbers.items.find(
      (otherNum: NumData) => otherNum.id === otherNumId
    )
  );

  return (
    <Modal title={'View Other Number'}>
      <ViewOtherNumbers data={otherNum} />
    </Modal>
  );
}
