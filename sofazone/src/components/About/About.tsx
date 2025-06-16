import React, { FC } from 'react';
import './About.scss';
import Header from '../Header/Header';

interface AboutProps { }

const About: FC<AboutProps> = () => (
  <div className="About">
    <Header />
    <div className="about-container">
      <div className="about-image" />
      <div className="about-text">
        <p>
        <br /><br />
          At <strong>SOFAZONE</strong>, we believe that your living space deserves more than just furniture –
          <br />
          it deserves <strong>comfort</strong>, <strong>elegance</strong>, and <strong>character</strong>.
          <br /><br />
          We proudly offer a carefully curated collection of <strong>high-quality seating systems</strong> that blend modern aesthetics with timeless comfort.
          <br />
          Each piece is selected with attention to detail – from luxurious fabrics and durable materials to ergonomic support and smart design.
          <br /><br />
          Our mission is to help you create a space that feels like home.
          <br />
          Whether you're furnishing a cozy family living room, a chic apartment, or a stylish office lounge –
          <br />
          <strong>SOFAZONE</strong> brings you pieces that fit both your needs and your taste.
          <br /><br />
          We're passionate about <strong>quality</strong>, <strong>design</strong>, and <strong>customer satisfaction</strong>.
          <br />
          From the moment you visit our site to the day your sofa arrives at your door,
          <br />
          we’re here to ensure a smooth, inspiring experience.
          <br /><br />
          Welcome to <strong>SOFAZONE</strong> –
          <br />
          where <strong>comfort meets design</strong>.
        </p>
      </div>
    </div>
  </div>
);

export default About;
