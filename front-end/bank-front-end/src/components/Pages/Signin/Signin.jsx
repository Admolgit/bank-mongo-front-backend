import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';
import './Signin.css';
// const eye = <FontAwesomeIcon icon={faEye} />;

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [submitted, setSubmitted] = useState(false);

  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //setSubmitted(true);
    console.log(formData);
    Axios.post('http://localhost:3500/auth/login', {
      email: formData.email,
      password: formData.password,
    })
      .then((response) => {
        console.log(response.data);
        const token = response.data.accessToken;
        localStorage.setItem("accessToken", JSON.stringify(token));
        setMessage(response.data.msg);
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          navigate('/dashboard');
        } else {
          setMessage('Invalid Credentials');
        }
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          setMessage(error.response.data.msg);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setMessage(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          setMessage('Error' + error.message);
        }
      });
  };

  const handleSigninText = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/signup/');
  };

  return (
  <div className="signin-form-container">
  <div className="container-signin">
    <div className="wrap-signin">
      <form
        action="#"
        onSubmit={handleSubmit}
        className="signin-form validate-form"
      >
        <span className="signin-form-title">Sign In</span>

        <div
          className="wrap-input-signin validate-email"
          data-validate="Please enter email-address"
        >
          <label className="email" htmlFor="email">
            Email Address
          </label>
          <input
            className="input-signin"
            type="text"
            name="email"
            onChange={handleSigninText}
            value={formData.email}
            placeholder="Email Address"
            id="email-address"
          />
        </div>
        <div
          className="wrap-input-signin validate-password"
          data-validate="Please enter password"
        >
          <label className="password" htmlFor="password">
            Password
          </label>
          <input
            className="input-signin"
            name="password"
            value={formData.password}
            onChange={handleSigninText}
            placeholder="Password"
            id="password"
            type={passwordShown ? 'text' : 'password'}
          />
          {/* <i className="eye" onClick={togglePasswordVisiblity}>
            {eye}
          </i> */}
        </div>

        <button className="signin-btn" type="submit">
          Sign In
        </button>

        <button className="signup-btn" onClick={handleSignup}>
          Sign Up
        </button>

        {message.length > 0 ? (
          <div>
            <br></br>
            <p style={{ textAlign: 'center' }}>{message}</p>
          </div>
        ) : null}
      </form>
    </div>
  </div>
</div>
);
};

export default Signin;
