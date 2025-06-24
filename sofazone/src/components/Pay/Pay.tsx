import React, { FC, useState } from 'react';
import '../../scss/form-style.scss';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

interface PayProps {}

const Pay: FC<PayProps> = () => {
  const cartItems = useSelector((state: any) => state.cart.items) as any[];
  const navigate = useNavigate();

  // personal details
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  // payment details
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [ccv, setCcv] = useState('');

  const total = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !cardNumber || !expiry || !ccv) {
      alert('Please fill in all fields');
      return;
    }
    alert('🎉 Payment successful!');
    navigate('/');
  };

  return (
    <div className="Pay">
      <div className="Pay enter">
        <div className="enter-box">
          <h2>Payment & Order</h2>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="columns-container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              
              {/* Column 1 - Order Details */}
              <section
                className="order-details"
                style={{ flex: 1, minWidth: '250px', maxHeight: '70vh', overflowY: 'auto' }}
              >
                <h3>Order Details</h3>
                <ul className="checkout-summary">
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      {item.title} (x{item.quantity}) - ${item.price * item.quantity}
                    </li>
                  ))}
                </ul>
                <h3>Total: ${total}</h3>
              </section>

              {/* Column 2 - Personal Details */}
              <section className="personal-details" style={{ flex: 1, minWidth: '250px' }}>
                <h3>Personal Details</h3>
                <label htmlFor="name">Full Name:</label>
                <input
                  id="name"
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />

                <label htmlFor="address">Address:</label>
                <input
                  id="address"
                  type="name"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St"
                />
              </section>

              {/* Column 3 - Payment Details */}
              <section className="payment-details" style={{ flex: 1, minWidth: '250px' }}>
                <h3>Payment Details</h3>
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                  id="cardNumber"
                  type="name"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                />

                <label htmlFor="expiry">Expiry Date:</label>
                <input
                  id="expiry"
                  type="name"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                />

                <label htmlFor="ccv">CCV:</label>
                <input
                  id="ccv"
                  type="name"
                  value={ccv}
                  onChange={(e) => setCcv(e.target.value)}
                  placeholder="123"
                />

                <button type="submit" className="submit-btn" style={{ marginTop: '1rem' }}>
                  Confirm Payment
                </button>

                {/* Payment icons */}
                <div
                  className="payment-icons"
                  style={{
                    marginTop: '1.5rem',
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                  }}
                >
                 <img src="/images/pay.png" style={{ width: '100%', height: 'auto' }} />
                </div>
              </section>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pay;
