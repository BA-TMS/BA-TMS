'use client';
// this creates a context to provide user session information to the app
// so we do not have to call it in every component that needs the information
import { createContext, useState, useEffect } from 'react';
import { createClient } from '../../util/supabase/client';
import { SupabaseUserSession } from '@/types/supabase';

interface UserProviderProps {
  children: React.ReactNode;
}

// default values are initial state to provide
export const UserContext = createContext({
  userSession: {
    user: {
      id: null,
      email: null,
      // add defaults for other properties if needed
    },
    expires_at: null,
    access_token: null,
    // Add other session-related properties as needed}
  },
  updateSession: (arg: any) => {},
});

export const UserContextProvider: React.FC<UserProviderProps> = ({
  children,
}) => {
  // create instance of supabase
  const supabase = createClient();

  const [userSession, setUserSession] = useState<any>(undefined); // should be a supabase session

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      console.log(session);

      // do something here with the session if needed

      if (session.data.session !== null) {
        setUserSession(session.data.session);
      } else console.log('No user sesh');
    });
  }, []);

  // not sure if this is correct/ relevant
  const updateSession = (newValue: SupabaseUserSession) => {
    console.log(newValue);
    setUserSession({ ...userSession, newValue });
  };

  return (
    <UserContext.Provider value={{ userSession, updateSession }}>
      {children}
    </UserContext.Provider>
  );
};
