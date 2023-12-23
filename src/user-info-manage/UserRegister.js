// UpdateForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button, Container, Form, Header, Input} from "semantic-ui-react";


const UserRegister =() => {
  const [user, setUser] = useState();
  const navigate  = useNavigate();
  const handleInputChange = (field, value) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const handleSubmit = () => {
    // Call the onUpdate function from the parent component
   

    axios.put(`http://localhost:5000/api/users/add`, user)
    .then(response => {
      console.log('User updated successfully:', response.data);
      // Refresh the vehicles list after update
      navigate('/login');
    })
    .catch(error => console.error('Error updating vehicle:', error));
  };
  

  return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40vh',

      }}>

        <Form style={{width: '300px'}}>
          <Form.Field>
            <label>User Name</label>
            <Input
                type="text"
                value={user?.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input
                type="text"
                value={user?.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </Form.Field>

          <Button type="button" onClick={handleSubmit} primary>
            Register
          </Button>
        </Form>
        </div>
  );
};

export default UserRegister;
