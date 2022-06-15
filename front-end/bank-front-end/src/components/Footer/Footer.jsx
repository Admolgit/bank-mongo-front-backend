import React from "react";
import './Footer.css';
  
const Footer = () => {
  return (
    <div className="FooterContainer">
      <div className="footer">
        <div className="rows">
          <div className="child">
            <h1 className="about">About Us</h1>
            <div className="children">
              <a href="#">Aim</a>
              <a href="#">Vision</a>
              <a href="#">Testimonials</a>
            </div>
          </div>
          <div className="child">
            <h1>Services</h1>
            <div className="children">
              <a href="#">Bank deposit</a>
              <a href="#">Money transfers</a>
              <a href="#">Bill payments</a>
              <a href="#">Create a new account</a>
            </div>
          </div>
          <div className="child">
            <h1>Contact Us</h1>
            <div className="children">
              <a href="#">Lagos</a>
              <a href="#">Enugu</a>
              <a href="#">Ibadan</a>
              <a href="#">Kano</a>
            </div>
          </div>
          <div className="child">
            <h1>Social Media</h1>
            <div className="children">
              <a href="#">
                <i className="fab fa-facebook-f">
                  <span style={{ marginLeft: "10px" }}>
                    Facebook
                  </span>
                </i>
              </a>
              <a href="#">
                <i className="fab fa-instagram">
                  <span style={{ marginLeft: "10px" }}>
                    Instagram
                  </span>
                </i>
              </a>
              <a href="#">
                <i className="fab fa-twitter">
                  <span style={{ marginLeft: "10px" }}>
                    Twitter
                  </span>
                </i>
              </a>
              <a href="#">
                <i className="fas fa-youtube">
                  <span style={{ marginLeft: "10px" }}>
                    Youtube
                  </span>
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;