import React, { FC, useEffect, useState } from 'react';
import './ProductDetails.scss';
import Header from '../Header/Header';
import { useParams } from 'react-router';
import { ProductModel } from '../../models/ProductModel';

interface Review {
  id: string;
  userId: number;
  productId: number;
  comment: string;
  rating: number;
}

interface User {
  id: string;
  name: string;
}

const ProductDetails: FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showReviews, setShowReviews] = useState(false);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));

    fetch(`http://localhost:3001/reviews?productId=${id}`)
      .then(res => res.json())
      .then(setReviews);

    fetch(`http://localhost:3001/users`)
      .then(res => res.json())
      .then(setUsers);
  }, [id]);

  const getUserName = (userId: number) => {
    const user = users.find(u => u.id.toString() === userId.toString());
    return user?.name || 'Unknown';
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="ProductDetails">
      <Header />
      <div className="top-section">
        <div className="left-side">
          <div className="info-section">
            <h2>{product.title}</h2>
            <p><strong>Price:</strong> {product.price} ₪</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Category:</strong> {product.category}</p>
          </div>

          <div className="purchase-section">
            <div className="quantity-controls">
              <button onClick={() => setAmount(prev => Math.max(prev - 1, 1))}>-</button>
              <label>{amount}</label>
              <button onClick={() => setAmount(prev => prev + 1)}>+</button>
            </div>
            <button className="btn">Add to Cart</button>
          </div>

          <div className="reviews-section">
            <p onClick={() => setShowReviews(prev => !prev)} className="toggle-btn">
              <strong>Reviews:</strong> {showReviews ? '▾' : '▸'}
            </p>
            {showReviews && (
              <ul className="review-list">
                {reviews.length === 0 ? (
                  <li>There are no reviews for this product yet :(</li>
                ) : (
                  reviews.map(r => (
                    <li key={r.id}>
                      <span className="stars">{'★'.repeat(Number(r.rating))}</span>
                      <strong>{getUserName(r.userId)}:</strong> {r.comment}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="right-side">
          <img src={product.image} alt={product.title} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
