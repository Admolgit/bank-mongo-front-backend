import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './Signup.css';

let url = 'http://localhost:3500/auth/register';

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function refreshPage() {
    window.location.reload();
  }

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    DOB: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleProfile = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    setProfile((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignin = (e) => {
    e.preventDefault();
    navigate('/signin/');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await Axios.post(
        url,
        {
          firstName: profile.firstname,
          lastName: profile.lastname,
          DOB: profile.DOB,
          email: profile.email,
          password: profile.password,
          phoneNumber: profile.phoneNumber,
        }
      );

      console.log(response.data.data);
      setSuccessMessage(response.data.data);

      setErrorMessage('');

    } catch (e) {
      let error = e.response.data;

      setErrorMessage(e.response.data);
      setSuccessMessage('');
      console.log(error);
    }
  };

  // if(email === profile.email && password === profile.password) {
  //   navigate('/dashboard/');
  // }

  //password toggle function
  const [state, setState] = useState(true);

  const toggleBtn = () => {
    setState((prevState) => !prevState);
  };
  console.log(successMessage);

  return (
    <>
      <div className="container2">
        <div className="heading">
          <h2>Sign Up</h2>
        </div>
        <div className="form">
          <form onSubmit={onSubmit}>
            {/* name */}
            <div className="form-group">
              <div id="name-label">
                <label className="label">First Name</label>
              </div>
              <input
                type="text"
                className="form-control"
                id="name"
                name="firstname"
                value={profile.firstname}
                onChange={handleProfile}
              />
              {errorMessage && !profile.firstname ? (
                <>
                  <p className="form-error">Firstname cannot be empty</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    // icon={solid('circle-exclamation')}
                  />
                </>
              ) : profile.firstname && profile.firstname.length < 3 ? (
                <>
                  <p className="form-error">Cannot be less than 3 characters</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    // icon={solid('circle-exclamation')}
                  />
                </>
              ) : null}
            </div>
            
            <div className="form-group">
              <div id="name-label">
                <label className="label">Last Name</label>
              </div>
              <input
                type="text"
                className="form-control"
                id="name"
                name="lastname"
                value={profile.lastname}
                onChange={handleProfile}
              />

              {errorMessage && !profile.lastname ? (
                <>
                  <p className="form-error">Lastname cannot be empty</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    // icon={solid('circle-exclamation')}
                  />
                </>
              ) : profile.lastname && profile.lastname.length < 3 ? (
                <>
                  <p className="form-error">Cannot be less than 3 characters</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    // icon={solid('circle-exclamation')}
                  />
                </>
              ) : null}
            </div>
            <div className="form-group">
              <div id="name-label">
                <label className="label">Date of Birth</label>
              </div>
              <input
                type="text"
                className="form-control"
                id="name"
                name="DOB"
                value={profile.DOB}
                onChange={handleProfile}
              />

              {errorMessage && !profile.DOB ? (
                <>
                  <p className="form-error">DOB cannot be empty</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    // icon={solid('circle-exclamation')}
                  />
                </>
              ) : profile.DOB && profile.DOB.length < 3 ? (
                <>
                  <p className="form-error">Cannot be less than 3 characters</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    // icon={solid('circle-exclamation')}
                  />
                </>
              ) : null}
            </div>
            {/* email */}
            <div className="form-group">
              <div id="email-label">
                <label className="label">Email Address</label>
              </div>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleProfile}
              />
              {errorMessage && !profile.email ? (
                <>
                  <p className="form-error">Email cannot be empty</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    // icon={solid('circle-exclamation')}
                  />
                </>
              ) : null}
            </div>
            {/* password */}
            <div className="form-group">
              <div id="password-label">
                <label className="label">Password</label>
              </div>
              <div id="password-toggle">
                <input
                  type={state ? 'password' : 'text'}
                  className="form-control password-control"
                  id="password"
                  name="password"
                  value={profile.password}
                  onChange={handleProfile}
                />
                  <FaEye className="togglebtn" onClick={toggleBtn}></FaEye>
              </div>
              {errorMessage && !profile.password ? (
                <>
                  <p className="form-error">Password cannot be empty</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    // icon={solid('circle-exclamation')}
                  />
                </>
              ) : profile.password &&
                !profile.password.match(
                  /(?=[A-Za-z0-9@#,.!$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#,.!$%^&+!=])(?=.{8,100}).*$/g
                ) ? (
                <>
                  <p className="form-error-password">Minimum of 8 characters</p>
                  <p className="form-error-password">At least 1 number</p>
                  <p className="form-error-password">At least 1 lowercase</p>
                  <p className="form-error-password">At least 1 uppercase</p>
                  <p className="form-error-password">At least 1 symbol</p>
                  <p className="form-error-password">No white spaces</p>
                </>
              ) : null}
            </div>
            {/* phone */}
            <div className="form-group">
              <div id="phone-label">
                <label className="label">Phone Number</label>
              </div>
              <input
                type="number"
                className="form-control"
                id="phone"
                name="phoneNumber"
                value={profile.phoneNumber}
                // placeholder="Mobile"
                onChange={handleProfile}
              />
              {errorMessage && !profile.phoneNumber ? (
                <>
                  <p className="form-error">phoneNumber cannot be empty</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    // icon={solid('circle-exclamation')}
                  />
                </>
              ) : profile.phoneNumber && profile.phoneNumber.match(/[A-Za-z]/g) ? (
                <>
                  <p className="form-error">Please enter a valid number</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    // icon={solid('circle-exclamation')}
                  />
                </>
              ) : null}
            </div>

            {/* submit */}
            <div className="form-group">
              <button type="submit" className="btn-signup">
                Sign Up
              </button>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn-signin"
                onClick={handleSignin}
              >
                Sign In
              </button>

              {successMessage.length > 0 ? (
                <div className="success-msg">
                  <FontAwesomeIcon
                    onClick={refreshPage}
                    className="cancel-icon"
                    // icon={solid('circle-xmark')}
                  />
                  <FontAwesomeIcon
                    className="check-icon"
                    // icon={solid('circle-check')}
                  />{' '}
                  {successMessage}{' '}
                </div>
              ) : null}
              {errorMessage.length >= 1 && errorMessage.includes('exists') ? (
                <div className="error-msg">
                  {' '}
                  <FontAwesomeIcon
                    className="email-error-icon"
                    // icon={solid('triangle-exclamation')}
                  />
                  {errorMessage}{' '}
                </div>
              ) : null}
              <p className="policy">
                By signing up, you agree to our{' '}
                <a href="http://">Terms & Conditions</a> and our{' '}
                <a href="http://">Privacy Policy</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
