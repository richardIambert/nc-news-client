import { createContext, useContext, useEffect, useReducer } from 'react';
import { supabase } from '../../../configuration/supabase';
import { useParams } from 'react-router-dom';

// CommentContext - initial state
const initial = {
  comments: [],
  isLoading: false,
  error: null,
};

// CommentContext - dispatch action types
export const GET_COMMENTS_START = 'GET_COMMENTS_START';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR';
export const POST_COMMENT_START = 'POST_COMMENT_START';
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const POST_COMMENT_ERROR = 'POST_COMMENT_ERROR';
export const RESET_COMMENTS = 'RESET_COMMENTS';

// CommentContext - reducer function
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'GET_COMMENTS_START': {
      return { ...state, comments: [], isLoading: true, error: null };
    }
    case 'GET_COMMENTS_SUCCESS': {
      return { ...state, comments: payload, isLoading: false, error: null };
    }
    case 'GET_COMMENTS_ERROR': {
      return { ...state, comments: [], isLoading: false, error: payload };
    }
    case 'POST_COMMENT_START': {
      return { ...state, isLoading: true, error: null };
    }
    case 'POST_COMMENT_SUCCESS': {
      return {
        ...state,
        comments: [...state.comments, payload].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ),
        isLoading: false,
        error: null,
      };
    }
    case 'POST_COMMENT_ERROR': {
      return { ...state, isLoading: false, error: payload };
    }
    case 'RESET_COMMENTS': {
      return { ...initial };
    }
    default: {
      return state;
    }
  }
};

// CommentContext - context
const CommentContext = createContext(initial);

// CommentContext - useContext wrapper hook
export const useComment = () => {
  return useContext(CommentContext);
};

// CommentContext - context provider
export const CommentContextProvider = ({ children }) => {
  const { article_id } = useParams();
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: GET_COMMENTS_START });
        const { data, error } = await supabase
          .from('comments')
          .select()
          .eq('article_id', article_id)
          .order('created_at', { ascending: false });
        if (error) throw new Error(error);
        dispatch({ type: GET_COMMENTS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_COMMENTS_ERROR, payload: error });
      }
    })();
  }, [article_id]);

  return (
    <CommentContext.Provider value={{ ...state, dispatch }}>{children}</CommentContext.Provider>
  );
};
