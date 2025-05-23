import { CommentListItem } from './CommentListItem';

export const CommentList = ({ comments, isLoading, error }) => {
  // TODO: Extract Loading component
  if (isLoading) return <p>Loading...</p>;

  // TODO: Extract Error component
  if (error) return <p>Error loading comments...</p>;

  return (
    <ol className="divide-y divide-neutral-200">
      {comments
        .sort((a, b) => a.created_at - b.created_at)
        .map((comment) => (
          <CommentListItem
            key={comment.comment_id}
            {...comment}
          />
        ))}
    </ol>
  );
};
