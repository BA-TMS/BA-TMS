'use client';

import { useState, useEffect } from 'react';
import Loader from '@/components/common/Loader';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import { createClient } from '@/util/supabase/client';

// Unlike layouts that persist across routes and maintain state, templates create a new instance for each of their children on navigation.
// could be useful for authentication

export default function Template({ children }: { children: React.ReactNode }) {
  console.log('template render');

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = createClient();

  const [userSession, setUserSession] = useState<any>(null); // should be a supabase session or is null

  // get the session on component render
  // what do we add to dependency array to trigger re-render after login?
  // could also create a user session provider
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // reset loading

    supabase.auth.getSession().then((session) => {
      console.log(session);

      // do something here with the session

      if (session.data.session !== null) {
        setUserSession(session.data.session);
      } else console.log('No user sesh');
    });
  }, []);

  return (
    <div className="bg-white text-black dark:bg-boxdark-2 dark:text-bodydark">
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
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
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
