import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../../configuration/supabase';
import { getFirstLastNames } from '../../../services/formatting';

// AuthContext - context
const AuthContext = createContext(null);

// AuthContext - useContext wrapper hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthContext - context provider
export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user.user_metadata || null);
        setIsLoading(false);
      })
      .catch(console.error);

    const {
      data: { listener },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user.user_metadata || null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const signup = (email, password, fullname) => {
    const [first_name, last_name] = getFirstLastNames(fullname);
    return supabase.auth
      .signUp({
        email,
        password,
        options: { data: { first_name, last_name } },
      })
      .catch(console.error);
  };

  const signin = (email, password) => {
    return supabase.auth.signInWithPassword({ email, password }).catch(console.error);
  };

  const signout = async () => {
    return supabase.auth.signOut().catch(console.error);
  };

  return (
    <AuthContext.Provider value={{ session, user, isLoading, error, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
