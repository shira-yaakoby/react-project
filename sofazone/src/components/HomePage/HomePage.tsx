import React, { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate, useNavigation } from 'react-router';
import '../../scss/homePage-style.scss';
import Header from '../Header/Header';
import '../../scss/form-style.scss';
import './HomePage.scss'
import { ProductModel } from '../../models/ProductModel';

const HomePage: FC = () => {
  const productsNavigation = useNavigate(); 
  const [topProducts, setTopProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((data: ProductModel[]) => {
        const sorted = data
          .sort((a, b) => b.buyCount - a.buyCount) // מיון מהכי הרבה קניות
          .slice(0, 3); // שלושת הראשונים
        setTopProducts(sorted);
      })
      .catch((error) => console.error('שגיאה בשליפת מוצרים:', error));
  }, []);

  return <div className="HomePage">
    <Header />
    <div className="homepage-content">
      <h1 className="homepage-title">Welcome to SOFAZONE</h1>
      <p className="homepage-subtitle">Your comfort, our passion.</p>

      <section className="featured-section">
        <h2 className="featured-title">Featured Products</h2>
        <div className="product-list">
          {topProducts.map((product, index) => (
            <div className="product-card" onClick={()=>{productsNavigation(`/Products/${product.id}`)}} key={index}>
              <img className="product-image" src={product.image} alt={product.title} />
              <h3 className="product-name">{product.title}</h3>
              <p className="product-price">{product.price}$</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <button className="submit-btn" onClick={() => { productsNavigation('/Products') }}>Browse All Products</button>
      </section>
    </div>
  </div>
}

export default HomePage;
