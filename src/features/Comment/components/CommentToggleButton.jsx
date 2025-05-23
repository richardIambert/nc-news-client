import { CommentIcon } from '../../../components/icons';

export const CommentToggleButton = ({ count, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full inline-flex gap-1 items-center bg-neutral-200 text-neutral-600 text-sm hover:bg-neutral-300 transition-colors cursor-pointer"
    >
      <CommentIcon />
      <span>{count}</span>
    </button>
  );
};
