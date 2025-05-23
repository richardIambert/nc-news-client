import { ArticleAge } from './ArticleAge';
import { ArticleBookmarkButton } from './ArticleBookmarkButton';
import { ArticleCommentCount } from './ArticleCommentCount';
import { ArticleEdited } from './ArticleEdited';
import { ArticleEditButton } from './ArticleEditButton';
import { ArticleLikeCount } from './ArticleLikeCount';
import { BulletSeparator, FlexGroup } from '../../../components';
import { TopicPill } from '../../Topic/components/TopicPill';
import { useNavigate } from 'react-router-dom';

export const ArticleListItem = ({ article_id, title, topic, body, created_at, votes }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/articles/${article_id}`);
  };

  return (
    <article
      onClick={handleClick}
      className="p-6 rounded-xl grid gap-4 bg-white shadow hover:scale-102 hover:shadow-lg transition-all cursor-pointer"
    >
      <header className="space-y-4">
        <div className="flex items-center">
          <FlexGroup>
            <TopicPill title={topic} />
          </FlexGroup>
          <FlexGroup className="ml-auto">
            {/* FIXME: Conditionally render based on authentication and article ownership */}
            <ArticleEditButton />
            <ArticleBookmarkButton />
          </FlexGroup>
        </div>
        <h3 className="text-2xl">{title}</h3>
      </header>
      <main className="text-neutral-500">
        <p className="line-clamp-2">{body}</p>
      </main>
      <footer className="mt-auto">
        <FlexGroup className="gap-4">
          <FlexGroup>
            <ArticleLikeCount count={votes} />
            <ArticleCommentCount count={0} />
          </FlexGroup>
          <FlexGroup>
            <ArticleAge createdAt={created_at} />
            <BulletSeparator />
            {/* FIXME: Conditionally render based on isEdited status of article */}
            <ArticleEdited />
          </FlexGroup>
        </FlexGroup>
      </footer>
    </article>
  );
};
