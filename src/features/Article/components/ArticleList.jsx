import { useArticle } from '../contexts/ArticleContext';
import { ArticleListItem } from './ArticleListItem';

export const ArticleList = () => {
  const { articles, isLoading, error } = useArticle();

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {/* TODO: Extract ArticlesSkeleton component */}
      {isLoading && <p>Loading...</p>}
      {/* TODO: Extract ErrorMessage component */}
      {error && <p>{JSON.stringify(error)}</p>}
      {articles?.length > 0 &&
        articles?.map((article) => (
          <ArticleListItem
            key={article.article_id}
            {...article}
          />
        ))}
    </div>
  );
};
