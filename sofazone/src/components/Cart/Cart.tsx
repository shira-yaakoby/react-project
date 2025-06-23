import React from 'react';
import './Cart.scss';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="Cart">
      <Header />
      <br />
      <h2>Shopping Cart</h2>

      {items.length === 0 ? (
        <p className='cart-summary'>Too bad, your cart is empty :(</p>
      ) : (
        <div className='cart-flex'>
          <ul className="cart-list">
            {items.map(item => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.title}
                  onClick={() => navigate(`/Products/${item.id}`)}
                  style={{ width: '80px', cursor: 'pointer' }}
                />
                <div className="cart-info">
                  <h4>{item.title}</h4>
                  <div className="info-line">
                    <span>Quantity: {item.quantity}</span>
                    <span>Price per item: ${item.price}</span>
                    <span>Total: ${item.price * item.quantity}</span>
                  </div>
                </div>

              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h3>Total: ${total}</h3>
            <button className="pay-button" onClick={() => navigate('/Pay')}>
              To Pay
            </button>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default Cart;
