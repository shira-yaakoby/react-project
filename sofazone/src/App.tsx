import React from 'react';
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
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='Login' element={<Login/>}></Route>
        <Route path='Signup' element={<Signup/>}></Route>
        <Route path='HomePage' element={<HomePage/>}></Route>
        <Route path='About' element={<About/>}></Route>
        <Route path='Cart' element={<Cart/>}></Route>
        <Route path='Products' element={<Products/>}></Route>
        <Route path='Products/:id' element={<ProductDetails/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
