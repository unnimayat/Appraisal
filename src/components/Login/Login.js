import React, { useState } from 'react';
import './Login.css';  

function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleLogin = (e) => {
      e.preventDefault();
  
      // Implement your authentication logic here
      if (userId === 'exampleuser' && password === 'password123') {
        // Successful login, redirect or perform the desired action
        alert('Login successful!');
      } else {
        // Failed login attempt, display an error message
        setErrorMessage('Invalid user ID or password. Please try again.');
      }
    };
  
    return (
      <div className="login-page">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
             
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              placeholder='User Id'
            />
          </div>
          <div className="form-group">
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Password'
            />
          </div>
          <button type="submit" style={{justifyContent: "center"}}>Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    );
  }
  
  export default Login;
  
