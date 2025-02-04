import { createContext, useState, useEffect } from 'react';
import { createClient } from '@util/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextProps {
  session: Session | null;
  user: User | null;
  organization: string;
  signOut: () => void;
}

export const UserContext = createContext<UserContextProps>({
  session: null,
  user: null,
  organization: '',
  signOut: () => {},
});

export const UserContextProvider: React.FC<UserProviderProps> = ({
  children,
}) => {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [organization, setOrganization] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      setSession(session);
      setUser(session?.user ?? null);
      setOrganization(session?.user.user_metadata.org_name);
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (_event === 'SIGNED_OUT') {
          console.log('Token has expired or user is signed out.');
        }
        if (_event === 'INITIAL_SESSION') {
          console.log('Initial session');
        }
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const value = {
    session,
    user,
    organization,
    signOut: () => supabase.auth.signOut(),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
