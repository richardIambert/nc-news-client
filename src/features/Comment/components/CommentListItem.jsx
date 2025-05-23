import { BulletSeparator, FlexGroup } from '../../../components';
import { CommentAge } from './CommentAge';
import { CommentAuthor } from './CommentAuthor';
import { CommentEdited } from './CommentEdited';
import { CommentLikeCount } from './CommentLikeCount';

export const CommentListItem = ({ comment_id, body, votes, created_at }) => {
  return (
    <li className="p-4 space-y-4">
      <header>
        <FlexGroup>
          <CommentAuthor />
          <BulletSeparator />
          <CommentAge createdAt={created_at} />
          <BulletSeparator />
          <CommentEdited />
        </FlexGroup>
      </header>
      <main>
        <p>{body}</p>
      </main>
      <footer>
        <CommentLikeCount count={votes} />
      </footer>
    </li>
  );
};
