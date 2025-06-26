// src/hooks/useFetch.ts
import { useState, useEffect } from 'react';

function useFetch<T>(url: string, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // למניעת עדכון אחרי unmount
    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(json => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message || 'Error fetching data');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, deps); // תלות דינמית כאן

  return { data, loading, error };
}

export default useFetch;
