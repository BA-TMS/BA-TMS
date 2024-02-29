// 'use client';

import './globals.css';
// import "./data-tables-css.css";
// import { useState, useEffect } from 'react';
import Loader from '@/components/common/Loader';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';

// root layouts are not supposed to be client components per next.js docs
// can create a client component which has the provides, import that into the root layout and wrap the app in it

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { sidebarOpen, toggleSidebar, loading } = useContext(RootLayoutContext);

  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [userSession, setUserSession] = useState<any>(null); // should be a supabase session or is null

  // get the session on component render
  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);

  // supabase.auth.getSession().then((session) => {
  //   // do something here with the session
  //   if (session.data.session !== null) {
  //     setUserSession(session.data.session);
  //   }
  // });
  // }, []);

  async function placeholder() {
    'use server';
    console.log('this is a fake function to avoid errors');
  }

  const userSession = true; // easy test
  const loading = false;

  return (
    <html suppressHydrationWarning lang="en">
      <body className="bg-white text-black dark:bg-boxdark-2 dark:text-bodydark">
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : userSession ? ( // Render non-loading components if user session is not null
            <div className="flex h-screen overflow-hidden">
              <Sidebar sidebarOpen={false} setSidebarOpen={placeholder} />

              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={false} setSidebarOpen={placeholder} />

                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          ) : (
            <div className="flex h-screen overflow-hidden">
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <main>
                  {/* we could render a different header */}
                  <p>oops please log in</p>
                  {children}
                  {/* put some logic here to log in form or redirect or something */}
                </main>
              </div>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
