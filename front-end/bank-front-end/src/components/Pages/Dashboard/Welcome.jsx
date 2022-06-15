import React from 'react';
import Header from './Header';
import HomeImg from '../../../images/Home.png';
import Footer from '../../Footer/Footer';
import './Welcome.css';

function Dashboard() {
  return (
    <div>
      <Header />
      <div className="dash-container">
        <div className="dashboard">
          <h1 className="title">Create Account, Make Transfer, Pay Bills</h1>
          <p className="title-short">We support payment abroad and transfers</p>
        </div>
        <div className="image">
          <img className="img" src={HomeImg} alt="Home Image" />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard