import React, { FC } from 'react';
import './Header.scss';
import { Outlet, useNavigate } from 'react-router-dom';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

  const headerNavigate = useNavigate();

 return <div className="Header">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button> */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <label className="nav-link" onClick={()=>{headerNavigate('/HomePage')}}>HomePage <span className="sr-only"></span></label>
          </li>
          <li className="nav-item">
            <label className="nav-link" onClick={()=>{headerNavigate('/Products')}}>Products</label>
          </li>
          <li className="nav-item">
            <label className="nav-link" onClick={()=>{headerNavigate('/Profile')}}>Profile</label>
          </li>
          <li className="nav-item">
            <label className="nav-link" onClick={()=>{headerNavigate('/Cart')}}>Cart</label>
          </li>
          <li className="nav-item">
            <label className="nav-link"  onClick={()=>{headerNavigate('/About')}}>About</label>
          </li>
        </ul>
      </div>
    </nav>
    <Outlet></Outlet>  </div>
}

export default Header;
