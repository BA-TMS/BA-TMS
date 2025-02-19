'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import Modal from '@ui/Modal/Modal';
import { RootState } from '@/store/store';
import { ConsigneeData } from '@/types/consigneeTypes';
import ViewConsigneeForm from '@/components/Forms/Consignee/ViewConsignee';

// page uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function ViewConsigneeModal() {
  const pathname = usePathname();

  // slice the pathname to get the id
  const consigneeId = pathname.split('/view/')[1];

  // use the id to pull from redux
  const consignee = useSelector((state: RootState) =>
    state.consignees.items.find(
      (consignee: ConsigneeData) => consignee.id === consigneeId
    )
  );

  return (
    <Modal title={'View Consignee'}>
      <ViewConsigneeForm data={consignee} />
    </Modal>
  );
}
