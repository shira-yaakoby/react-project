import React, { FC, useEffect, useState } from 'react';
import './Products.scss';
import Header from '../Header/Header';
import { Link, useNavigate } from 'react-router-dom';
import { number } from 'yup';
import { Product } from '../../models/Product';

interface ProductsProps { }

const Products: FC<ProductsProps> = () => {

  // const productsNavigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/products') // תעדכני לפי הנתיב של JSON שלך
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return <div className="Products">
    <Header />
    <h2>מוצרים</h2>
    <div className="products-grid">
      {products.map(product => (
        <Link key={product.id} to={`/products/${product.id}`} className="product-card">
          <img src={product.image} alt={product.title} width="150" />
          <h3>{product.title}</h3>
          <p>{product.price} ₪</p>
        </Link>
      ))}
    </div>
  </div>
}


export default Products;
