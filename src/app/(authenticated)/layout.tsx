'use client';

import { useState, useEffect } from 'react';
import Loader from '@/components/common/Loader';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import { UserContextProvider } from '@/Context/userContextProvider';
import { ContextProvider } from '@/Context/modalContext';

export default function Template({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <UserContextProvider>
      <div className="text-black dark:text-grey-200 bg-grey-100 dark:bg-grey-800">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex h-screen overflow-hidden">
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />

            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />

              <main>
                <div className="mx-auto max-w-screen-2xl">{children}</div>
              </main>
            </div>
          </div>
        )}
      </div>
    </UserContextProvider>
  );
}
