import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Transaction from '../../Transaction/Transaction';
import Footer from '../../Footer/Footer';
// import Deposit from '../../Transaction/Deposit';
import "./Dashboard.css"

function Dashboard() {

  let navigate = useNavigate();

  const handleHistory = () => {
    
    navigate(`/dashboard/history`)
  }

  const handleTransfer = () => {

    navigate(`/dashboard/transfer`)
  }

  const handleDeposit = () => {

    navigate(`/dashboard/deposit`)
  }

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    navigate('/');
  }

  return (
    <div>
      <div className="background">
        <div className="dashboard-container">
          <h1 className="dashboard-title">Bank App</h1>
          <div className="nav">
            <h3 onClick={handleHistory}>Transaction History</h3>
            <h3 onClick={handleTransfer}>Transfer</h3>
            <h3 onClick={handleDeposit}>Deposit</h3>
          </div>
        </div>
      </div>
      <div className="bank">
        <div className="row">
          <div className="column">
            <h1 className="navigations">Transaction</h1>
            <h1 className="navigations">Transaction</h1>
            <h1 className="navigations">Transaction</h1>
            <h1 className="navigations">Transaction</h1>
            <h1 className="navigations">Transaction</h1>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </div>
          <div>
            <Transaction />
            {/* <Deposit /> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}



export default Dashboard