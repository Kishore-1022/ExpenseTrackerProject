
import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './Contextapi';

const Login = () => {
  const ctx=useContext(api)
  const email=useRef()
  const password=useRef() 
  const navigate=useNavigate()
  const [isLogin, setIsLogin] = useState(true);

  const handleFormToggle = () => {
    setIsLogin(!isLogin);
  };

const handleForgotPassword = async () => {
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
        ctx.login(data.idToken)
      } else {
       
        console.error(`Error ${isLogin ? 'logging in' : 'registering account'}:`, data.message);
      }
    } catch (error) {
      console.error(`Error ${isLogin ? 'logging in' : 'registering account'}:`, error);
    }
    navigate('/welcome')
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
        <br />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <p>
        <button type="button" onClick={handleForgotPassword}>
          Forgot Password?
        </button>
      </p>
      </form>

      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button type="button" onClick={handleFormToggle}>
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
      
    </div>
  );
};

export default Login;
