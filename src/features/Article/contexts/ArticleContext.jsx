import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { supabase } from '../../../configuration/supabase';

// ArticleContext - initial state
const initial = {
  articles: [],
  currentArticle: null,
  currentArticleId: null,
  isLoading: false,
  error: null,
  searchTerm: '',
};

// ArticleContext - dispatch action types
export const GET_ARTICLES_START = 'GET_ARTICLES_START';
export const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
export const GET_ARTICLES_ERROR = 'GET_ARTICLE_ERROR';
export const GET_ARTICLE_START = 'GET_ARTICLE_START';
export const GET_ARTICLE_SUCCESS = 'GET_ARTICLE_SUCCESS';
export const GET_ARTICLE_ERROR = 'GET_ARTICLE_ERROR';
export const POST_ARTICLE_LIKE_START = 'POST_ARTICLE_LIKE_ERROR';
export const POST_ARTICLE_LIKE_SUCCESS = 'POST_ARTICLE_LIKE_SUCCESS';
export const POST_ARTICLE_LIKE_ERROR = 'POST_ARTICLE_LIKE_START';
export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM';
export const UPDATE_CURRENT_ARTICLE = 'UPDATE_CURRENT_ARTICLE';
export const UPDATE_CURRENT_ARTICLE_ID = 'UPDATE_CURRENT_ARTICLE_ID';
export const RESET_ARTICLES = 'RESET_ARTICLES';

// ArticleContext - reducer function
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'GET_ARTICLES_START': {
      return { ...state, articles: [], isLoading: true, error: null };
    }
    case 'GET_ARTICLES_SUCCESS': {
      return { ...state, articles: payload, isLoading: false, error: null };
    }
    case 'GET_ARTICLES_ERROR': {
      return { ...state, articles: [], isLoading: false, error: payload };
    }
    case 'GET_ARTICLE_START': {
      return { ...state, isLoading: true, error: null };
    }
    case 'GET_ARTICLE_SUCCESS': {
      return { ...state, articles: [...state.articles, payload], isLoading: false, error: null };
    }
    case 'GET_ARTICLE_ERROR': {
      return { ...state, isLoading: false, error: payload };
    }
    case 'UPDATE_SEARCH_TERM': {
      return { ...state, searchTerm: payload };
    }
    case 'UPDATE_CURRENT_ARTICLE': {
      return { ...state, currentArticle: payload };
    }
    case 'UPDATE_CURRENT_ARTICLE_ID': {
      return { ...state, currentArticleId: payload };
    }
    case 'RESET_ARTICLES': {
      return { ...initial };
    }
    case 'POST_ARTICLE_LIKE_START': {
      return { ...state, isLoading: true, error: null };
    }
    case 'POST_ARTICLE_LIKE_SUCCESS': {
      return {
        ...state,
        isLoading: false,
        articles: [...state.articles].map((article) =>
          article.article_id === payload ? { ...article, votes: article.votes + 1 } : article
        ),
        currentArticle: { ...state.currentArticle, votes: state.currentArticle.votes + 1 },
      };
    }
    case 'POST_ARTICLE_LIKE_ERROR': {
      return { ...state, isLoading: false, error: payload };
    }
    default: {
      return state;
    }
  }
};

// ArticleContext - context
const ArticleContext = createContext(initial);

// ArticleContext - useContext wrapper hook
export const useArticle = () => {
  return useContext(ArticleContext);
};

// ArticleContext - context provider
export const ArticleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: GET_ARTICLES_START });
        const { data, error } = await supabase.from('article_with_author').select('*');
        if (error) throw new Error(error);
        dispatch({ type: GET_ARTICLES_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_ARTICLES_ERROR, payload: error });
      }
    })();
  }, []);

  return (
    <ArticleContext.Provider value={{ ...state, dispatch }}>{children}</ArticleContext.Provider>
  );
};
