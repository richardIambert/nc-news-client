import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../../configuration/supabase';
import {
  useArticle,
  GET_ARTICLE_START,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_ERROR,
  UPDATE_CURRENT_ARTICLE,
  UPDATE_CURRENT_ARTICLE_ID,
} from '../contexts/ArticleContext';
import { CommentContextProvider, CommentToggleButton, CommentWrapper } from '../../Comment';
import { ArticleAge } from '../components/ArticleAge';
import { ArticleAuthor } from '../components/ArticleAuthor';
import { ArticleEdited } from '../components/ArticleEdited';
import { ArticleLikeButton } from '../components/ArticleLikeButton';
import { BulletSeparator, FlexGroup } from '../../../components';
import { Header } from '../../App';
import { TopicPill } from '../../Topic/components/TopicPill';

export const ArticlePage = () => {
  const { article_id } = useParams();
  const { articles, currentArticle, currentArticleId, dispatch } = useArticle();
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const article = articles.find((article) => article.article_id === +article_id);
        if (article) {
          dispatch({ type: UPDATE_CURRENT_ARTICLE, payload: article });
          dispatch({ type: UPDATE_CURRENT_ARTICLE_ID, payload: article_id });
        } else {
          dispatch({ type: GET_ARTICLE_START });
          const { data, error } = await supabase
            .from('articles')
            .select()
            .eq('article_id', article_id);
          if (error) throw new Error(error);
          dispatch({ type: GET_ARTICLE_SUCCESS, payload: data[0] });
          dispatch({ type: UPDATE_CURRENT_ARTICLE, payload: data[0] });
          dispatch({ type: UPDATE_CURRENT_ARTICLE_ID, payload: data[0].article_id });
        }
      } catch (error) {
        dispatch({ type: GET_ARTICLE_ERROR, payload: error });
      }
    })();
  }, []);

  const toggleIsCommentOpen = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  // TODO: Extract NotFound page
  if (!currentArticle) return <p>Not Found</p>;

  const {
    title,
    topic,
    author = 'User Deleted', // TODO: update select article to join on profile where user_ids are equal
    body,
    created_at,
    article_img_url,
    votes,
  } = currentArticle;

  return (
    <>
      <Header />
      <main className="px-6 py-12 space-y-8">
        <header className="space-y-4">
          <TopicPill title={topic} />
          <h2 className="text-4xl">{title}</h2>
          <FlexGroup>
            <ArticleAuthor author={author} />
            <BulletSeparator />
            <ArticleAge createdAt={created_at} />
            <BulletSeparator />
            <ArticleEdited />
          </FlexGroup>
        </header>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {article_img_url && (
            <img
              src={article_img_url}
              alt={title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
          )}
          <p className="p-6">{body}</p>
          <CommentContextProvider>
            <FlexGroup className="p-4 gap-1">
              <CommentToggleButton onClick={toggleIsCommentOpen} />
              <ArticleLikeButton
                articleId={article_id}
                likes={votes}
              />
            </FlexGroup>
            <CommentWrapper
              articleId={currentArticleId}
              isOpen={isCommentOpen}
            />
          </CommentContextProvider>
        </div>
      </main>
    </>
  );
};
