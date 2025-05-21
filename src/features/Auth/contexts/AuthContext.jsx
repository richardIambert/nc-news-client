import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../../configuration/supabase';
import { getFirstLastNames } from '../../../services/formatting/formatName';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user?.user_metadata);
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setSession(session?.user?.user_metadata);
      });
    })();
  }, []);

  const signup = async (email, password, fullname) => {
    try {
      const [first_name, last_name] = getFirstLastNames(fullname);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { first_name, last_name } },
      });
      if (error) throw new Error(error);
      setSession(data.session);
      return { data: data.session, error: null };
    } catch (error) {
      console.error(error);
      setSession(null);
      return { data: null, error };
    }
  };

  const signin = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error);
      return { data: data.session, error: null };
    } catch (error) {
      console.error(error);
      setSession(null);
      return { data: null, error };
    }
  };

  const signout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error);
      setSession(null);
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, signin, signout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
/**
 * After signing up or signing in, you should fetch the latest user information from Supabase.
 * This is typically done by calling `supabase.auth.getUser()` after a successful sign up or sign in,
 * and then updating your local state with the returned user data.
 *
 * In your code, you should update the `signup` and `signin` functions to fetch and set the user info after authentication.
 *
 * Example usage:
 *   const { signin, signup, user } = useAuth();
 *   await signin(email, password);
 *   // user state will be updated automatically via the onAuthStateChange listener in useEffect.
 *
 * Alternatively, you can manually fetch user info after sign in/up if needed:
 *   const { data: { user } } = await supabase.auth.getUser();
 */
