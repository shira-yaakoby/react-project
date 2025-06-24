import React from 'react';
import './Cart.scss';
import '../ProductDetails/ProductDetails.scss';
import Header from '../Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../../store/MessageSlice';

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deleteFromCart = (id: number) => {
    dispatch({ type: 'cart/removeFromCart', payload: id });
    localStorage.setItem('cart', JSON.stringify(items.filter(item => item.id !== id)));

  };

  return (
    <div className="Cart">
      <br />
      <h2>Shopping Cart</h2>

      {items.length === 0 ? (
        <p className='cart-summary'>Too bad, your cart is empty :(</p>
      ) : (
        <div className='cart-flex'>
          <ul className="cart-list">
            {items.map(item => (

              <li key={item.id} className="cart-item">
                <button className="delete-btn" onClick={() => { deleteFromCart(item.id) }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                </button>
                <img
                  src={item.image}
                  alt={item.title}
                  onClick={() => navigate(`/Header/Products/${item.id}`)}
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
            <button className="pay-button" onClick={() => navigate('/Header/Pay')}>
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
