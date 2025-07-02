import React, { FC, useEffect, useState } from 'react';
import './ProductDetails.scss';
import'../../scss/popupForm.scss';
import Header from '../Header/Header';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ProductModel } from '../../models/ProductModel';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/CartSlice';
import { log } from 'console';
import store from '../../store/store';
import { setMessage } from '../../store/MessageSlice';
import { RootState } from '../../store/store';
import { Rating, Stack } from '@mui/material';
import { ReviewModel } from '../../models/ReviewModel';

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
  const location = useLocation();
  const productDetailsNavigate = useNavigate();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showReviews, setShowReviews] = useState(false);
  const [amount, setAmount] = useState(1);
  const [clickedAddReview, setClickedAddReview] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [ratingValue, setRatingValue] = useState<number>(5);
  const user = useSelector((state: RootState) => state.user.user);
  const isAdmin = user?.isAdmin === true;

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

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!product) {
      dispatch(setMessage({ type: 'error', text: 'We were unable to add the product to your cart.' }));
      return;
    }

    dispatch(addToCart({ product, amount }));
    console.log(store.getState())
    localStorage.setItem('cart', JSON.stringify(store.getState().cart.items));
    dispatch(setMessage({ type: 'success', text: 'The product was successfully added to the cart.' }));
  };


  const handleDeleteReview = (reviewId: string) => {
    fetch(`http://localhost:3001/reviews/${reviewId}`, {
      method: 'DELETE',

    })
      .then(() => {
        dispatch(setMessage({ type: 'success', text: 'Your review has been successfully deleted.' }));
        setReviews(prev => prev.filter(r => r.id !== reviewId));
      })
      .catch(error => {
        dispatch(setMessage({ type: 'error', text: 'We were unable to delete your review.' }));
        console.error('Error deleting review:', error);
      });
  }

  const addReview = () => {
    console.log('enter addReview');
    setClickedAddReview(true);
  }

  const saveReview = (comment: string, rating: number) => {
    if (!product) {
      dispatch(setMessage({ type: 'error', text: 'Product not found.' }));
      return;
    }
    let review = new ReviewModel(
      user?.id?.toString() || '',
      product.id,
      comment,
      rating
    );
    console.log('review', review);
    //db
    fetch('http://localhost:3001/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
      .then(res => {
        if (!res.ok)
          dispatch(setMessage({ type: 'error', text: 'Failed to save review.' }));

        return res.json();
      })
      .then((savedReview: Review) => {
        dispatch(setMessage({ type: 'success', text: 'Review saved successfully.' }));
        setReviews(prev => [...prev, savedReview]);
        setClickedAddReview(false); // סגירת טופס
      })
      .catch(() => {
        dispatch(setMessage({ type: 'error', text: 'Failed to save review.' }));
      });
  }

  return (
    <div className="ProductDetails">
      {product ? (
        <div className="top-section">
          {clickedAddReview && !isAdmin ?
            // <div className="add-review">
              <div className="popup-form">

              <span onClick={() => setClickedAddReview(false)} style={{ cursor: 'pointer' }}>X</span>
              <h1>Add review</h1>

              <p>Your review</p>
              <textarea
                placeholder="Write your review here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />

              <p>Your rating</p>
              <Stack spacing={1}>
                <Rating
                  name="user-rating"
                  value={ratingValue}
                  precision={1}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'number') setRatingValue(newValue);
                  }}
                />
              </Stack>

              <button className='btn' onClick={() => saveReview(reviewText, ratingValue)}>Save Review</button>
            </div>

            : null}
          <div className="left-side">
            <div className="info-section">
              <h2>{product.title}</h2>
              <p><strong>Price:</strong> {product.price}$</p>
              <p><strong>Purchased:</strong> {product.buyCount}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Category:</strong> {product.category}</p>
            </div>

            <div className="purchase-section">
              <div className="quantity-controls">
                <button onClick={() => setAmount(prev => Math.max(prev - 1, 1))}>-</button>
                <label>{amount}</label>
                <button onClick={() => setAmount(prev => prev + 1)}>+</button>
              </div>
              <button className="btn" onClick={handleAddToCart}>add to cart</button>
            </div>

            <div className="reviews-section">
              <p className="toggle-btn">
                {!isAdmin ? <button className='btn' onClick={() => { addReview() }}>add review</button> : null}
                <strong onClick={() => setShowReviews(prev => !prev)}>Reviews: {showReviews ? '▾' : '▸'}</strong>

              </p>
              {showReviews && (
                <ul className="review-list">
                  {reviews.length === 0 ? (
                    <li>There are no reviews for this product yet :(</li>
                  ) : (
                    reviews.map(r => {
                      const rawUser = localStorage.getItem('loggedUser');
                      const loggedUser: User | null = rawUser ? JSON.parse(rawUser) : null;
                      const isOwner = loggedUser && r.userId.toString() === loggedUser.id.toString();
                      return (
                        <li key={r.id}>
                          <span className="stars">{'★'.repeat(Number(r.rating))}</span>
                          <strong>{getUserName(r.userId)}:</strong> {r.comment}
                          {isOwner ?
                            <button className="delete-btn" onClick={() => handleDeleteReview(r.id)}>
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
                            </button> : null
                          }
                        </li>
                      );
                    })
                  )}
                </ul>
              )}

            </div>
          </div>


          <div className="right-side">
            <button
              className="return-btn"
              onClick={() => {
                const query = location.search;
                productDetailsNavigate(`/Header/Products${query}`);
              }}
            >
              ← Return
            </button>
            <img src={product.image} alt={product.title} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>

      )}


    </div>
  );
};

export default ProductDetails;
