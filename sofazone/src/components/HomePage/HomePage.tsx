import React, { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate, useNavigation } from 'react-router';
import '../../scss/homePage-style.scss';
import Header from '../Header/Header';
import '../../scss/form-style.scss';
import './HomePage.scss'
import { ProductModel } from '../../models/ProductModel';
import useFetch from '../../hooks/useFetch';

const HomePage: FC = () => {
  const productsNavigation = useNavigate();
  const [topProducts, setTopProducts] = useState<ProductModel[]>([]);


  const { data: allProducts, loading, error } = useFetch<ProductModel[]>('http://localhost:3001/products', []);

  useEffect(() => {
    if (allProducts) {
      const sorted = allProducts.sort((a, b) => b.buyCount - a.buyCount).slice(0, 3);
      setTopProducts(sorted);
    }
  }, [allProducts]);

  return <div className="HomePage">
    <div className="homepage-content">
      <h1 className="homepage-title">Welcome to SOFAZONE</h1>
      <p className="homepage-subtitle">Your comfort, our passion.</p>

      <section className="featured-section">
        <h2 className="featured-title">Featured Products</h2>
        <div className="product-list">
          {topProducts.map((product, index) => (
            <div className="product-card" onClick={() => { productsNavigation(`/Header/Products/${product.id}`) }} key={index}>
              <img className="product-image" src={product.image} alt={product.title} />
              <h3 className="product-name">{product.title}</h3>
              <p className="product-price">{product.price}$</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <button className="submit-btn" onClick={() => { productsNavigation('/Header/Products') }}>Browse All Products</button>
      </section>
    </div>
  </div>
}

export default HomePage;
