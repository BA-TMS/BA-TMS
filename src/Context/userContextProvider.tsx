'use client';
// this creates a context to provide user session information to the app
// so we do not have to call it in every component that needs the information
import { createContext, useState, useEffect } from 'react';
import { createClient } from '@/util/supabase/client';
import { SupabaseUserSession } from '@/types/supabase';

interface UserProviderProps {
  children: React.ReactNode;
}

// default values are initial state to provide
export const UserContext = createContext({
  userSession: null,
  updateSession: (arg: any) => {},
  logout: () => {},
});

export const UserContextProvider: React.FC<UserProviderProps> = ({
  children,
}) => {
  // create instance of supabase
  const supabase = createClient();

  const [userSession, setUserSession] = useState<any>(null); // should be a supabase session or is null

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      console.log(session);

      // do something here with the session

      if (session.data.session !== null) {
        setUserSession(session.data.session);
      } else console.log('No user sesh');
    });
  }, []);

  const updateSession = (newValue: SupabaseUserSession) => {
    console.log(newValue);
    setUserSession({ ...userSession, newValue });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUserSession(null);
  };

  return (
    <UserContext.Provider value={{ userSession, updateSession, logout }}>
      {children}
    </UserContext.Provider>
  );
};
