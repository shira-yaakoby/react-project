import React, { FC, useEffect, useMemo, useState, useRef } from 'react';
import { ProductModel } from '../../models/ProductModel';

const PAGE_SIZE = 20;

const Products: FC = () => {
  const [category, setCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [searchName, setSearchName] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100000);

  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  // בונה URL עם כל הפרמטרים כולל עמוד וסינון
  const buildUrl = (pageNum: number) => {
    const params = new URLSearchParams();

    if (category !== 'all') params.append('category', category);
    if (searchName.trim()) params.append('q', searchName.trim());
    params.append('price_gte', minPrice.toString());
    params.append('price_lte', maxPrice.toString());

    if (sortOrder === 'asc') {
      params.append('_sort', 'price');
      params.append('_order', 'asc');
    } else if (sortOrder === 'desc') {
      params.append('_sort', 'price');
      params.append('_order', 'desc');
    } else if (sortOrder === 'bestseller') {
      params.append('_sort', 'buyCount');
      params.append('_order', 'desc');
    }

    params.append('_limit', PAGE_SIZE.toString());
    params.append('_page', pageNum.toString());

    return `http://localhost:3001/products?${params.toString()}`;
  };

  // טעינת מוצרים
  const loadProducts = async (pageNum: number, reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(buildUrl(pageNum));
      const data: ProductModel[] = await res.json();

      setProducts(prev => (reset ? data : [...prev, ...data]));
      setHasMore(data.length === PAGE_SIZE);
    } catch {
      // הודעת שגיאה
    }
    setLoading(false);
  };

  // אתחול טעינת מוצרים עם כל שינוי בסינונים - מאפס את המוצרים והעמוד
  useEffect(() => {
    setPage(1);
    loadProducts(1, true);
  }, [category, sortOrder, searchName, minPrice, maxPrice]);

  // טעינת מוצרים בעמוד חדש בגלילה
  useEffect(() => {
    if (page === 1) return; // כבר טעינו בעמוד הראשון אחרי סינון
    loadProducts(page);
  }, [page]);

  // הגדרת observer לגלילה אינסופית
  const lastProductRef = (node: HTMLDivElement | null) => {
    if (loading) return;
    if (!hasMore) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  // רינדור מוצרים, מציבים ref על האחרון לגלילה אינסופית
  const productList = useMemo(() => {
    return products.map((product, index) => {
      if (index === products.length - 1) {
        return (
          <div
            key={product.id}
            ref={lastProductRef}
            className="product-card"
            onClick={() => {
              /* ניווט */
            }}
          >
            {/* תצוגת מוצר */}
          </div>
        );
      }
      return (
        <div
          key={product.id}
          className="product-card"
          onClick={() => {
            /* ניווט */
          }}
        >
          {/* תצוגת מוצר */}
        </div>
      );
    });
  }, [products]);

  return (
    <div className="Products">
      {/* סינונים */}
      <input
        type="text"
        placeholder="חיפוש לפי שם"
        value={searchName}
        onChange={e => setSearchName(e.target.value)}
      />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="all">כל הקטגוריות</option>
        {/* קטגוריות */}
      </select>
      {/* שאר הסינונים */}

      <div className="products-grid">{productList}</div>

      {loading && <p>טוען...</p>}
      {!hasMore && <p>אין עוד מוצרים לטעון</p>}
    </div>
  );
};
