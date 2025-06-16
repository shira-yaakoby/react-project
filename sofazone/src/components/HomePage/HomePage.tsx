import React, { FC } from 'react';
import { Outlet, useNavigate, useNavigation } from 'react-router';
import '../../scss/homePage-style.scss';
import Header from '../Header/Header';
import '../../scss/login-signup-style.scss';
import './HomePage.scss'

const HomePage: FC = () => (
  //const productsNavigation = useNavigate();

  <div className="HomePage">
    <Header />
    <div className="homepage-content">
      <h1 className="homepage-title">Welcome to SOFAZONE</h1>
      <p className="homepage-subtitle">Your comfort, our passion.</p>

      <section className="featured-section">
        <h2 className="featured-title">Featured Products</h2>
        <div className="product-list">
          {[
            {
              title: 'Luxury Sofa',
              price: '$999',
              img: 'https://divanicenter.co.il/wp-content/uploads/2022/09/wsi-imageoptim-display-%D7%93%D7%99%D7%A1%D7%A4%D7%9C%D7%99%D7%99.jpeg'
            },
            {
              title: 'Modern Armchair',
              price: '$499',
              img:'https://urban-shop.co.il/media/catalog/product/cache/5080f00f360d5bec7cd2eec6cc6895b0/6/0/600261_.jpg',
            },
            {
              title: 'Cozy Sectional',
              price: '$1299',
              img: 'https://www.dandesigncenter.co.il/wp-content/uploads/2018/08/maya_result.jpg',
            },
          ].map((product, index) => (
            <div className="product-card" key={index}>
              <img className="product-image" src={product.img} alt={product.title} />
              <h3 className="product-name">{product.title}</h3>
              <p className="product-price">{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <button className="submit-btn" /*onClick={()=>{productsNavigation('/Products')}}*/>Browse All Products</button>
      </section>
    </div>
  </div>
);

export default HomePage;
