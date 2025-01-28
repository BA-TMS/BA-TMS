'use client';
import { useRef, useContext } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/store/store';
import { UserContext } from '@/context/userContextProvider';
import { fetchLoads } from '@/store/slices/loadSlice';
import { fetchBrokers } from '@/store/slices/brokerSlice';
import { fetchCarriers } from '@/store/slices/carrierSlice';

// client component to create store and share using provider
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // only fetch relevant entries from db
  const { organization } = useContext(UserContext);
  console.log('org', organization);

  const storeRef = useRef<AppStore | null>(null); // ensure store is only created once
  if (!storeRef.current) {
    // create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(fetchLoads());
    storeRef.current.dispatch(fetchBrokers(organization)); // check this
    storeRef.current.dispatch(fetchCarriers());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
