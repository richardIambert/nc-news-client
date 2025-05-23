import { supabase } from '../../../configuration/supabase';
import {
  useArticle,
  POST_ARTICLE_LIKE_START,
  POST_ARTICLE_LIKE_SUCCESS,
  POST_ARTICLE_LIKE_ERROR,
} from '../contexts/ArticleContext';
import { LikeIcon } from '../../../components/icons';

export const ArticleLikeButton = ({ articleId, isLiked, likes }) => {
  const { dispatch, isLoading } = useArticle();

  const handleClick = async () => {
    try {
      dispatch({ type: POST_ARTICLE_LIKE_START });
      const { data, error } = await supabase
        .from('articles')
        .update('votes', { co })
        .eq('article_id', articleId);
      if (error) throw new Error(error);
      dispatch({ type: POST_ARTICLE_LIKE_SUCCESS });
    } catch (error) {
      dispatch({ type: POST_ARTICLE_LIKE_ERROR, payload: error });
    }
  };

  return (
    <button
      disabled={isLoading || isLiked}
      onClick={handleClick}
      className="px-4 py-2 rounded-full inline-flex gap-1 items-center bg-neutral-200 text-neutral-600 text-sm hover:bg-neutral-300 transition-colors"
    >
      <LikeIcon />
      <span>{likes}</span>
    </button>
  );
};
