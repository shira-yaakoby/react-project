import { useEffect, useState } from 'react';
import { ProductModel } from '../models/ProductModel';

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:3001/products');
        const data: ProductModel[] = await res.json();
        const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
};
