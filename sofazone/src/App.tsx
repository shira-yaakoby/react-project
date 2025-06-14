import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='Signup' element={<Signup/>}></Route>
        <Route path='HomePage' element={<HomePage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
