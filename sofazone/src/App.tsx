import React, { lazy, Suspense, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import About from './components/About/About';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Profile from './components/Profile/Profile';
import Pay from './components/Pay/Pay';
import NotFound from './components/NotFound/NotFound';
import { loginUser } from './store/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { clearMessage } from './store/MessageSlice';
import { ToastContainer, Toast } from 'react-bootstrap';
import { addToCart, setCartItems } from './store/CartSlice';
import Header from './components/Header/Header';

function App() {

  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.message);
  let isAdmin: boolean;

  useEffect(() => {
    const localStorageCart = localStorage.getItem('cart');
    const localStorageUser = localStorage.getItem('loggedUser');
    if (localStorageUser) {
      const parsedUser = JSON.parse(localStorageUser);
      isAdmin = parsedUser.isAdmin
      dispatch(loginUser(parsedUser));
    }
    if (localStorageCart) {
      const parsedCart = JSON.parse(localStorageCart);
      dispatch(setCartItems(parsedCart));
    }
  }, []);
  
  const LazyAddProduct = React.lazy(() => import('./components/AddProduct/AddProduct'))

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />

        <Route path="Header" element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path="HomePage" element={<HomePage />} />
          <Route path="About" element={<About />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Products" element={<Products />} />
          <Route path="Products/:id" element={<ProductDetails />} />
          <Route path="AddProduct" element={
            <Suspense fallback={<div>loading...</div>}>
              <LazyAddProduct onClose={() => {}} />
            </Suspense>
          } />
          <Route path="Profile" element={<Profile />} />
          <Route path="Pay" element={<Pay />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        className="p-3 custom-toast-container"
      >
        <Toast
          onClose={() => dispatch(clearMessage())}
          show={!!message.text}
          className={`custom-toast ${message.type}`}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">
              {message.type === 'error' ? 'Error' : 'Success'}
            </strong>
            <small>Now</small>
          </Toast.Header>
          <Toast.Body>{message.text}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div >
  );
}

export default App;
