import React, { useState } from 'react'; 
import axios from 'axios';
import './Login.css'
function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://appbackend-rala.onrender.com/login', {
        userId,
        password,
      });
  
      if (response.status === 200) {
        // Successful login, save the JWT token to local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('ID', userId);
        console.log('login');
      
        const userRole = response.data.role; // Get the user's role
      
        // Redirect based on the user's role
        if (userRole === 'evaluator') {
          window.location.href = '/evaluation';
        } else if (userRole === 'reviewer') {
          window.location.href = '/reviewer';
        } else {
          // Handle other roles or scenarios as needed
          window.location.href = '/home';
        }
      
        // Redirect or perform the desired action
        alert('Login successful!');
      }
      
    } catch (error) {
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

