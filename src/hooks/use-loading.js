import { useEffect, useState } from 'react';

export const useLoading = (fn) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { data: response, error } = await fn();
        if (error) throw new Error(error);
        setData(response);
      } catch (error) {
        setData(null);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { isLoading, error, data };
};
