import React, { FC } from 'react';
import { Outlet } from 'react-router';
import '../../scss/homePage-style.scss';
interface HomePageProps { }

const HomePage: FC<HomePageProps> = () => (
  <div className="HomePage">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button> */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">HomePage <span className="sr-only"></span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Products</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Cart</a>
          </li>
        </ul>
      </div>
    </nav>
    <Outlet></Outlet>
  </div>
);

export default HomePage;
