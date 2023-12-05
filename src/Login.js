import { authActions } from './Contextapi';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const email=useRef()
  const password=useRef() 
  const navigate=useNavigate()
  const [isLogin, setIsLogin] = useState(true);

  const handleFormToggle = () => {
    setIsLogin(!isLogin);
  };

const handleForgotPassword = async () => {
  if(!email.current.value){
    alert('Please enter registered email!')
  }else{
    alert('Reset link has been sent to your registered Email')
    try {
      const endpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDW06_RxkmqCUsLd7-gYF9mGl0bDsIaHLs';
  
      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({
          email: email.current.value,
          requestType: 'PASSWORD_RESET',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Password reset email sent successfully');
       
      } else {  
        console.error('Error sending password reset email:', data.error.message);
      }
    } catch (error) {
      console.error('Error sending password reset email:', error.message); 
    }
   };
  }
    
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDW06_RxkmqCUsLd7-gYF9mGl0bDsIaHLs' : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDW06_RxkmqCUsLd7-gYF9mGl0bDsIaHLs';

      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ 
            email:email.current.value, 
            password:password.current.value,
            returnSecuredToken: true }),
        headers: {
          'Content-Type': 'application/json'
        },
        
      });
      const data = await response.json();
    
      if (response.ok) {
        console.log(isLogin ? 'Login successful' : 'Account registered successfully');
        dispatch(authActions.login(data.idToken))
        navigate('/welcome')
      } else {
       
        console.error(`Error ${isLogin ? 'logging in' : 'registering account'}:`, data.message);
        alert(data.error.message)
      }
    } catch (error) {
      console.error(`Error ${isLogin ? 'logging in' : 'registering account'}:`, error);
     
    }
    
    e.target.reset();
    
  };

  return (
    <div className='container' >
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Email:
          <input
            type="email"
            ref={email}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            ref={password}
            required
          />
        </label>
        <button type="button" className='btn btn-light text-primary'  onClick={handleForgotPassword}>
          Forgot Password?
        </button>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        
      </form>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button type="button"  className='btn btn-light text-primary' onClick={handleFormToggle}>
          {isLogin ? 'Register here' : 'Login here'}
        </button>
    </div>
  );
};

export default Login;
