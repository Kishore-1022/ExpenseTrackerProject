
import React, { useState, useRef } from 'react';

const Login = () => {
  const email=useRef()
  const password=useRef() 
  const [isLogin, setIsLogin] = useState(true);

  const handleFormToggle = () => {
    setIsLogin(!isLogin);
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

      if (response.ok) {
        console.log(isLogin ? 'Login successful' : 'Account registered successfully');
      } else {
        const errorData = await response.json();
        console.error(`Error ${isLogin ? 'logging in' : 'registering account'}:`, errorData.message);
      }
    } catch (error) {
      console.error(`Error ${isLogin ? 'logging in' : 'registering account'}:`, error.message);
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
        <br />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
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
