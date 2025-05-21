import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { supabase } from '../../../configuration/supabase';
import { getFirstLastNames } from '../../../services/formatting';

// AuthContext - initial state
const initial = {
  session: null,
  user: null,
  isLoading: false,
  error: null,
};

// AuthContext - dispatch action types
export const GET_SESSION_START = 'GET_SESSION_START';
export const GET_SESSION_SUCCESS = 'GET_SESSION_SUCCESS';
export const GET_SESSION_ERROR = 'GET_SESSION_ERROR';
export const SIGN_IN_START = 'SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_UP_START = 'SIGN_UP_START';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const SIGN_OUT_START = 'SIGN_OUT_START';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR';

// AuthContext - reducer function
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'GET_SESSION_START': {
      return { ...state, session: null, user: null, isLoading: true, error: null };
    }
    case 'GET_SESSION_SUCCESS': {
      return {
        ...state,
        session: payload,
        user: payload?.user?.user_metadata,
        isLoading: false,
        error: null,
      };
    }
    case 'GET_SESSION_ERROR': {
      return { ...state, session: null, user: null, isLoading: false, error: payload };
    }
    case 'SIGN_IN_START': {
      return { ...state, session: null, user: null, isLoading: true, error: null };
    }
    case 'SIGN_IN_SUCCESS': {
      return {
        ...state,
        session: payload,
        user: payload?.user?.user_metadata,
        isLoading: false,
        error: null,
      };
    }
    case 'SIGN_IN_ERROR': {
      return { ...state, session: null, user: null, isLoading: false, error: payload };
    }
    case 'SIGN_UP_START': {
      return { ...state, session: null, user: null, isLoading: true, error: null };
    }
    case 'SIGN_UP_SUCCESS': {
      return {
        ...state,
        session: payload,
        user: payload?.user?.user_metadata,
        isLoading: false,
        error: null,
      };
    }
    case 'SIGN_UP_ERROR': {
      return { ...state, session: null, user: null, isLoading: false, error: payload };
    }
    case 'SIGN_OUT_START': {
      return { ...state, session: null, user: null, isLoading: true, error: null };
    }
    case 'SIGN_OUT_SUCCESS': {
      return { ...state, session: null, user: null, isLoading: false, error: null };
    }
    case 'SIGN_OUT_ERROR': {
      return { ...state, session: null, user: null, isLoading: false, error: payload };
    }
    default: {
      return state;
    }
  }
};

// AuthContext - context
const AuthContext = createContext(null);

// AuthContext - useContext wrapper hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthContext - context provider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: GET_SESSION_START });
        const {
          data: { session },
        } = await supabase.auth.getSession();
        dispatch({ type: GET_SESSION_SUCCESS, payload: session });
        supabase.auth.onAuthStateChange((_event, session) => {
          dispatch({ type: GET_SESSION_START });
          dispatch({ type: GET_SESSION_SUCCESS, payload: session });
        });
      } catch (error) {
        dispatch({ type: GET_SESSION_ERROR, payload: error });
      }
    })();
  }, []);

  const signup = async (email, password, fullname) => {
    try {
      dispatch({ type: SIGN_UP_START });
      const [first_name, last_name] = getFirstLastNames(fullname);
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { first_name, last_name } },
      });
      if (error) throw new Error(error);
      dispatch({ type: SIGN_UP_SUCCESS, payload: session });
    } catch (error) {
      dispatch({ type: SIGN_UP_ERROR, payload: error });
    }
  };

  const signin = async (email, password) => {
    try {
      dispatch({ type: SIGN_IN_START });
      const {
        data: { session },
        error,
      } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error);
      dispatch({ type: SIGN_IN_SUCCESS, payload: session });
    } catch (error) {
      dispatch({ type: SIGN_IN_ERROR, payload: error });
    }
  };

  const signout = async () => {
    try {
      dispatch({ type: SIGN_OUT_START });
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error);
      dispatch({ type: SIGN_OUT_SUCCESS });
    } catch (error) {
      dispatch({ type: SIGN_OUT_ERROR });
    }
  };
  return (
    <AuthContext.Provider value={{ state, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
