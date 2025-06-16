import React, { FC } from 'react';
import { Outlet } from 'react-router';
import '../../scss/homePage-style.scss';
import Header from '../Header/Header';
interface HomePageProps { }

const HomePage: FC<HomePageProps> = () => (
  <div className="HomePage">
    <Header />
    HomePage Component
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      {/* כותרת ראשית */}
      <h1>Welcome to SOFAZONE</h1>
      <p>Your comfort, our passion.</p>

      {/* מוצרים מובילים */}
      <section>
        <h2>Featured Products</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ border: '1px solid #ccc', padding: '1rem', width: '150px' }}>
            <img src="https://urban-shop.co.il/media/catalog/product/cache/5080f00f360d5bec7cd2eec6cc6895b0/6/0/600261_.jpg" alt="Sofa 1" width={'150px'} />
            <h3>Luxury Sofa</h3>
            <p>$999</p>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '1rem', width: '150px' }}>
            <img src="https://home-id.co.il/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-14-at-14.28.57-1.jpeg" alt="Sofa 2" width={'150px'} />
            <h3>Modern Armchair</h3>
            <p>$499</p>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '1rem', width: '150px' }}>
            <img src="https://www.dandesigncenter.co.il/wp-content/uploads/2018/08/maya_result.jpg" alt="Sofa 3" width={'150px'} />
            <h3>Cozy Sectional</h3>
            <p>$1299</p>
          </div>
        </div>
      </section>

      {/* קריאה לפעולה */}
      <section style={{ marginTop: '2rem' }}>
        <button style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
          Browse All Products
        </button>
      </section>
    </div>
  </div>
);

export default HomePage;
