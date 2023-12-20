// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({toggleNav}) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate  = useNavigate();


  const handleLogin = async () => {

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {

        // Authentication successful
        console.log('Login successful');
        const jsonBody = await response.json();
        console.log('user_type'+jsonBody.user_type);
        sessionStorage.setItem('user_type',jsonBody.user_type);
        toggleNav();
        navigate('/home');
      } else {
        // Authentication failed
        console.error('Login failed');
        setError("username or password not correct")
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleRegister = async()=>{
    navigate('/user-register');

  }
  

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={handleRegister}>
          register
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
