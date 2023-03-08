import React, { useState } from 'react';
import Login from '../../components/login_form';
import SignUpForm from '../../components/signup_form';
import './index.css';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleButtonClick = () => {
    setIsSignup(isSignup ? false : true);
  }

  return (
    <div id="auth-page">
     
      <div id='forms-container'>
        {isSignup ? <SignUpForm className='form-component' /> : <Login className='form-component' />}
      </div>
      
      <button id="login-button" onClick={handleButtonClick}>{isSignup ? true : false}{isSignup ? 'Log in' : 'Sign up'}</button>
      
    </div>
  )
}

export default AuthPage