import React, { FC, useEffect, useState } from 'react';
import './Products.scss';
import Header from '../Header/Header';
import { Link, useNavigate } from 'react-router-dom';
import { number } from 'yup';
import { ProductModel } from '../../models/ProductModel';

interface ProductsProps { }

const Products: FC<ProductsProps> = () => {

  const [products, setProducts] = useState<ProductModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  return <div className="Products">
    <Header />
    <h2>מוצרים</h2>
    <div className="products-grid">
      {products.map(product => (
        <div
          key={product.id}
          className="product-card"
          onClick={() => handleClick(product.id.toString())}
          style={{ cursor: 'pointer' }}
        >
          <img src={product.image} alt={product.title} width="150" />
          <h3>{product.title}</h3>
          <p>{product.price} ₪</p>
        </div>
      ))}
    </div>
  </div>
}


export default Products;
