'use client';
import './globals.css';
// import "./data-tables-css.css";
import { useState, useEffect } from 'react';
import Loader from '@/components/common/Loader';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import SignIn from '@/components/Authentication/SignIn'; // Import SignIn component

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false); // Simulated signed-in state

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    // Here you would check if the user is signed in and update isSignedIn accordingly
    // For now, it's left as false to always show the SignIn component first
  }, []);

  // if (loading) {
  //   return <Loader />;
  // }

  if (!isSignedIn) {
    return <SignIn onSignInSuccess={() => setIsSignedIn(true)} />; // Pass a function to update isSignedIn
  }

  return (
    <html suppressHydrationWarning lang="en">
      <body className="bg-white text-black dark:bg-boxdark-2 dark:text-bodydark">
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="flex h-screen overflow-hidden">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Content Area Start ===== --> */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                           {/* <!-- ===== Header Start ===== --> */}
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              {/* <!-- ===== Header End ===== --> */}

              {/* <!-- ===== Main Content Start ===== --> */}
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
              {/* <!-- ===== Main Content End ===== --> */}
            </div>
            {/* <!-- ===== Content Area End ===== --> */}
          </div>
        </div>
      </body>
    </html>
  );
}
