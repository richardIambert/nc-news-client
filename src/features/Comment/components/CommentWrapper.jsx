import { useState } from 'react';
import { useComment } from '../contexts/CommentContext';
import { CommentEditor } from './CommentEditor';
import { CommentList } from './CommentList';
import { CommentToggleButton } from './CommentToggleButton';

export const CommentWrapper = ({ articleId, isOpen }) => {
  const { comments, isLoading, error } = useComment();

  return (
    <div className="relative">
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
