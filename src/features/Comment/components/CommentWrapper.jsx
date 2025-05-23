import { useState } from 'react';
import { useComment } from '../contexts/CommentContext';
import { CommentEditor } from './CommentEditor';
import { CommentList } from './CommentList';
import { CommentToggleButton } from './CommentToggleButton';

export const CommentWrapper = ({ articleId }) => {
  const { comments, isLoading, error } = useComment();
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <CommentToggleButton
          count={comments.length}
          onClick={toggleIsOpen}
        />
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'}`}>
        <CommentEditor articleId={articleId} />
        <CommentList
          comments={comments}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};
