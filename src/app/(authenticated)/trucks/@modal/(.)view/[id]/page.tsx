'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import Modal from '@ui/Modal/Modal';
import { RootState } from '@/store/store';
import { BrokerData } from '@/types/brokerTypes';
import ViewCustomsBroker from '@/components/Forms/CustomsBroker/ViewBroker';

// page uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function ViewBrokerModal() {
  const pathname = usePathname();

  // slice the pathname to get the id
  const brokerId = pathname.split('/view/')[1];

  // use the id to pull from redux
  const broker = useSelector((state: RootState) =>
    state.brokers.items.find((broker: BrokerData) => broker.id === brokerId)
  );

  return (
    <Modal title={'View Customs Broker'}>
      <ViewCustomsBroker data={broker} />
    </Modal>
  );
}
