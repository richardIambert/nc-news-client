-- PL/pgSQL function for incrementing article vote count
CREATE OR REPLACE FUNCTION increment_article_votes (article_id_param integer) returns void AS $$
BEGIN
  UPDATE public.articles
  SET votes = votes + 1
  WHERE article_id = article_id_param;
  RETURN;
END;
$$ language plpgsql;