import { useState, useEffect } from 'react';

function useFetch<T>(url: string, initialData: T) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(initialData);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Error status: ${res.status}`);
        return res.json();
      })
      .then(json => {
        setData(json);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [url]);

  return { loading, data, error };
}

export default useFetch;
