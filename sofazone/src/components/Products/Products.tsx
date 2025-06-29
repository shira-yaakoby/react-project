import React, { FC, useEffect, useState, useMemo } from 'react';
import './Products.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductModel } from '../../models/ProductModel';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { number } from 'yup';
import { setMessage } from '../../store/MessageSlice';
import { useDispatch } from 'react-redux';
import { AddPhotoAlternate } from '@mui/icons-material';
import AddProduct from '../AddProduct/AddProduct';


const Products: FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [price, setMaxPrice] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const percent = (price / 5000) * 100;
  const user = useSelector((state: RootState) => state.user.user);
  const isAdmin = user?.isAdmin === true;
  const [clickedAddProduct, setClickedAddProduct] = useState<boolean>(false);

  const PRODUCTS_PER_PAGE = 20;

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // קריאת פרמטרים מה-URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const sortParam = params.get('sort');
    const priceParam = params.get('price_lte');

    setCategory(categoryParam || 'all');
    setSortOrder(sortParam || 'default');
    setMaxPrice(priceParam ? Number(priceParam) : 0);
  }, [location.search]);

  // טעינת קטגוריות (פעם אחת)
  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => {
        const uniqueCategories = Array.from(new Set(data.map((p: ProductModel) => p.category))) as string[];
        setCategories(uniqueCategories);
      });
  }, []);

  // טעינת מוצרים מהשרת לפי עמוד וסינון
  const fetchProducts = async (reset = false) => {
    setIsLoading(true);
    const params = new URLSearchParams();

    if (category !== 'all') params.append('category', category);
    if (price > 0) params.append('price_lte', price.toString());

    params.append('_limit', PRODUCTS_PER_PAGE.toString());
    params.append('_start', (reset ? 0 : page * PRODUCTS_PER_PAGE).toString());

    const url = `http://localhost:3001/products?${params.toString()}`;
    const res = await fetch(url);
    const data = await res.json();

    if (reset) {
      setProducts(data);
      setPage(1);
    } else {
      setProducts(prev => [...prev, ...data]);
      setPage(prev => prev + 1);
    }

    setHasMore(data.length === PRODUCTS_PER_PAGE);
    setIsLoading(false);
  };

  // שליפה מחדש כשמשנים פילטרים
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    fetchProducts(true);
  }, [category, price]);

  // עדכון ה-URL בהתאם לפילטרים
  useEffect(() => {
    const params = new URLSearchParams();

    if (category !== 'all') params.set('category', category);
    if (sortOrder !== 'default') params.set('sort', sortOrder);
    if (price > 0) params.set('price_lte', price.toString());

    navigate({
      pathname: '/Header/Products',
      search: params.toString() ? `?${params.toString()}` : '',
    }, { replace: true });
  }, [category, sortOrder, price, navigate]);

  // מיון בצד לקוח
  const sortedProducts = useMemo(() => {
    let updated = [...products];
    if (sortOrder === 'asc') updated.sort((a, b) => a.price - b.price);
    else if (sortOrder === 'desc') updated.sort((a, b) => b.price - a.price);
    else if (sortOrder === 'bestseller') updated.sort((a, b) => b.buyCount - a.buyCount);
    return updated;
  }, [products, sortOrder]);
  //  <Fab size="small" /*color="secondary" */ aria-label="add">
  //             <AddIcon />
  //           </Fab>

  const deleteProduct = (id: number) => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete product');
        dispatch(setMessage({ type: 'success', text: 'The product was successfully deleted.' }));
        setProducts(prev => prev.filter(product => product.id !== id));
      })
      .catch(error => {
        dispatch(setMessage({ type: 'error', text: 'We were unable to delete this product.' }));
        console.error('Error deleting product:', error);
      });
  };


  return (
    <div className="Products">
      <div className="products-header">
        <div className="filters">
          <select onChange={e => setCategory(e.target.value)} value={category}>
            <option value="all">All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select onChange={e => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="default">Random</option>
            <option value="asc">Low To High</option>
            <option value="desc">High To Low</option>
            <option value="bestseller">Popular</option>
          </select>

          <div className="range">
            <span>0</span>
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={price}
              onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ '--percent': `${percent}%` } as React.CSSProperties}
            />
            <span>max {price}$</span>
          </div>
        </div>

        {isAdmin ? <button onClick={() => setClickedAddProduct(true)}>Add product +</button> : null}
      </div>
      {clickedAddProduct&&(<AddProduct onClose={()=>{setClickedAddProduct(false)}}/>)}

      <div className="products-grid">
        {sortedProducts.map(product => (
          <div
            key={product.id}
            className="product-card">
            <div onClick={() => {
              const query = new URLSearchParams({
                category,
                sort: sortOrder,
                price_lte: price.toString(),
              }).toString();
              navigate(`/Header/Products/${product.id}?${query}`);
            }}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.price} $</p>
            </div>
            {isAdmin ? <button className="delete-btn" onClick={() => { deleteProduct(product.id) }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button> : null}
          </div>
        ))}
      </div>

      {hasMore && !isLoading && (
        <div>
          <button className='btn' onClick={() => fetchProducts(false)}>
            הצג עוד
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

