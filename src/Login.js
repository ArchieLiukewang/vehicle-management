// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import {Button, Form, Input} from "semantic-ui-react";

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


        console.log('username'+username);
        sessionStorage.setItem('username',username);
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
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40vh',

      }}>
        {/*<h2>Login</h2>*/}
        <Form style={{width: '300px'}}>
          <Form.Field>
            <label>
              Username:
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
          </Form.Field>
          <Form.Field>
            <label>
              Password:
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
          </Form.Field>

          <div>
            <Button type="button" onClick={handleLogin} primary>
              Login
            </Button> &nbsp;&nbsp;&nbsp;
            <Button type="button" onClick={handleRegister} primary>
              Register
            </Button>
          </div>

        </Form>
        {error && <p className="error-message">{error}</p>}
      </div>
  );
};

export default Login;
