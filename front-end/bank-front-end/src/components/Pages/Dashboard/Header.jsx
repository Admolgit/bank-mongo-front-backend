import React from 'react';
import './Header.css'

function Header() {
  return (
    <div className="contain">
      <div className="header-container">
        <div className="header">Bank App
        </div>
        <div className="header-links">
          <a className="link" href="/signin">Sign In</a>
          <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  )
}

export default Header