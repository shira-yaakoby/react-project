import React, { FC } from 'react';
import './Header.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';


interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
  const rawUser = localStorage.getItem('loggedUser');
  const loggedUser = rawUser ? JSON.parse(rawUser) : null;
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
            <label className="nav-link" onClick={() => { headerNavigate('/HomePage') }}>HomePage <span className="sr-only"></span></label>
          </li>
          <li className="nav-item">
            <label className="nav-link" onClick={() => { headerNavigate('/Products') }}>Products</label>
          </li>
          <li className="nav-item">
            <label className="nav-link" onClick={() => { headerNavigate('/Profile') }}>Profile</label>
          </li>
          <li className="nav-item">
            <label className="nav-link" onClick={() => { headerNavigate('/Cart') }}>Cart</label>
          </li>
          <li className="nav-item">
            <label className="nav-link" onClick={() => { headerNavigate('/About') }}>About</label>
          </li>
          <li className="nav-item">
            <Tooltip title="Log out" arrow>
              <Button className="nav-link user-info" onClick={() => headerNavigate('/Login')}>
                {loggedUser.name}
                <svg
                  className="user-icon"
                  fill="currentColor"
                  viewBox="0 0 20 20"                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Tooltip>
          </li>
        </ul>
      </div>
    </nav>
    <Outlet></Outlet>  </div>
}

export default Header;
