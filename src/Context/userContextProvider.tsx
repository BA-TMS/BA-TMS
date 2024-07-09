import { createContext, useState, useEffect } from 'react';
import { createClient } from '@util/supabase/client';
// import { UserMetadata } from '@supabase/supabase-js';

interface UserMetadata {
  id: string | null;
  email: string | null;
  email_verified: boolean;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  phone_verified: boolean;
  sub: string | null;
  role?: string;
}

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextProps {
  userSession: UserMetadata;
  updateSession: (newValue: UserMetadata) => void;
}

// Default values are initial state to provide
const defaultUserMetadata: UserMetadata = {
  id: null,
  email: null,
  email_verified: false,
  first_name: null,
  last_name: null,
  phone_number: null,
  phone_verified: false,
  sub: null,
};

export const UserContext = createContext<UserContextProps>({
  userSession: defaultUserMetadata,
  updateSession: () => {},
});

export const UserContextProvider: React.FC<UserProviderProps> = ({
  children,
}) => {
  const supabase = createClient();

  const [userSession, setUserSession] =
    useState<UserMetadata>(defaultUserMetadata);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const metadata = user?.user_metadata as UserMetadata;

      setUserSession(metadata);
    };

    fetchData();
  }, [supabase.auth]);

  const updateSession = (newValue: UserMetadata) => {
    console.log(newValue);
    setUserSession({ ...userSession, ...newValue });
  };

  return (
    <UserContext.Provider value={{ userSession, updateSession }}>
      {children}
    </UserContext.Provider>
  );
};
