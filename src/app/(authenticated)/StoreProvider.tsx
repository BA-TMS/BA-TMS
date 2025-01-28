'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/store/store';
import { fetchLoads } from '@/store/slices/loadSlice';

// client component to create store and share using provider
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null); // ensure store is only created once
  if (!storeRef.current) {
    // create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(fetchLoads());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
