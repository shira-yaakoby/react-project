import React, { FC } from 'react';
import { Outlet } from 'react-router';
import '../../scss/homePage-style.scss';
import Header from '../Header/Header';
interface HomePageProps { }

const HomePage: FC<HomePageProps> = () => (
  <div className="HomePage">
    <Header />
    HomePage Component
  </div>
);

export default HomePage;
