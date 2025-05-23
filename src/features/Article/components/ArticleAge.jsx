import { getTimeElapsed } from '../../../services/formatting';

export const ArticleAge = ({ createdAt }) => {
  return <span className="text-sm text-neutral-500">{getTimeElapsed(createdAt)}</span>;
};
