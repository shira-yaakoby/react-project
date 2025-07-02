import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../../scss/homePage-style.scss';
import Header from '../Header/Header';
import '../../scss/form-style.scss';
import './HomePage.scss';
import { ProductModel } from '../../models/ProductModel';

const HomePage: FC = () => {
  const productsNavigation = useNavigate();
  const [topProducts, setTopProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:3001/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data: ProductModel[] = await res.json();
        const sorted = data.sort((a, b) => b.buyCount - a.buyCount).slice(0, 3);
        setTopProducts(sorted);
      } catch (err) {
        setError('Something went wrong while fetching products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="HomePage">
      <div className="homepage-content">
        <h1 className="homepage-title">Welcome to SOFAZONE</h1>
        <p className="homepage-subtitle">Your comfort, our passion.</p>

        <section className="featured-section">
          <h2 className="featured-title">Featured Products</h2>

          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}

          <div className="product-list">
            {topProducts.map((product) => (
              <div className="product-card" key={product.id} onClick={() => productsNavigation(`/Header/Products/${product.id}`)}>
                <img className="product-image" src={product.image} alt={product.title} />
                <h3 className="product-name">{product.title}</h3>
                <p className="product-price">{product.price}$</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <button className="submit-btn" onClick={() => productsNavigation('/Header/Products')}>Browse All Products</button>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
