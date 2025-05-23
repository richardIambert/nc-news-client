import { Link } from 'react-router-dom';

export const TopicPill = ({ className, title }) => {
  const styleMap = {
    color: {
      coding:
        'bg-indigo-300 text-indigo-900 hover:bg-indigo-400 transition-colors outline-2 outline-offset-2 outline-transparent outline-dashed focus:outline-indigo-400',
      football:
        'bg-emerald-300 text-emerald-900 hover:bg-emerald-400 transition-colors outline-2 outline-offset-2 outline-transparent outline-dashed focus:outline-emerald-400',
      cooking:
        'bg-yellow-300 text-yellow-900 hover:bg-yellow-400 transition-colors outline-2 outline-offset-2 outline-transparent outline-dashed focus:outline-yellow-400',
    },
  };
  return (
    <Link
      to={`/topics/${title}`}
      className={`inline-block px-4 py-2 rounded-full text-sm ${styleMap.color[title]} ${className}`}
    >
      {title}
    </Link>
  );
};
