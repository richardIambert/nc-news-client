import { useEffect, useState } from 'react';
import { supabase } from '../../../configuration/supabase';
import {
  useArticle,
  POST_ARTICLE_LIKE_START,
  POST_ARTICLE_LIKE_SUCCESS,
  POST_ARTICLE_LIKE_ERROR,
} from '../contexts/ArticleContext';
import { LikeIcon } from '../../../components/icons';
import { useAuth } from '../../Auth';

export const ArticleLikeButton = ({ articleId, likes }) => {
  const {
    session: {
      user: { id },
    },
  } = useAuth();
  const { dispatch, isLoading } = useArticle();
  const [isLiked, setIsLiked] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('users_articles_likes')
          .select()
          .eq('user_id', id)
          .eq('article_id', +articleId);
        if (error) throw new Error(error.message);
        if (data.length) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [likes]);

  const handleClick = async () => {
    try {
      dispatch({ type: POST_ARTICLE_LIKE_START });
      const { error: e1 } = await supabase.rpc('increment_article_votes', {
        article_id_param: +articleId,
      });
      if (e1) throw new Error(e1.message);
      const { error: e2 } = await supabase
        .from('users_articles_likes')
        .insert({ user_id: id, article_id: +articleId });
      if (e2) throw new Error(e2.message);
      dispatch({ type: POST_ARTICLE_LIKE_SUCCESS });
    } catch (error) {
      dispatch({ type: POST_ARTICLE_LIKE_ERROR, payload: error });
    }
  };

  return (
    <button
      disabled={isLoading || isLiked}
      onClick={handleClick}
      className={`px-4 py-2 rounded-full inline-flex gap-1 items-center bg-neutral-200 text-neutral-600 text-sm hover:bg-neutral-300 transition-colors ${
        isLiked ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <LikeIcon />
      <span>{likes}</span>
    </button>
  );
};
