import { EditIcon } from '../../../components/icons';

export const ArticleEditButton = () => {
  return (
    <button className="ml-auto bg-neutral-200 rounded-full size-10 flex items-center justify-center hover:bg-neutral-300 transition-colors cursor-pointer outline-2 outline-offset-2 outline-transparent outline-dashed focus:outline-red-500">
      <EditIcon />
    </button>
  );
};
