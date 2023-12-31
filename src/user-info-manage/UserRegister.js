// UpdateForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button, Container, Form, Header, Input, Radio} from "semantic-ui-react";


const UserRegister =() => {
  const [user, setUser] = useState();
  const navigate  = useNavigate();
  const handleInputChange = (field, value) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const handleSubmit = () => {
    // Call the onUpdate function from the parent component
    user.name= user.username;
    user.user_type= 'client';
    axios.put(`http://localhost:5000/api/users/register`, user)
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '40px',

      }}>

        <Form style={{width: '350px'}}>
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
          <Form.Field>
            <label>User Type</label>
            <Input
                type="text"
                value='client'
                readOnly='true'
                onChange={(e) => handleInputChange('user_type', e.target.value)}
            />
          </Form.Field>

          {/* Customer Fields */}
          <Form.Field>
            <label>ID Card Number</label>
            <Input
                type="text"
                value={user?.id_card_number}
                onChange={(e) => handleInputChange('id_card_number', e.target.value)}
            />
          </Form.Field>
          {/*<Form.Field>*/}
          {/*  <label>Name</label>*/}
          {/*  <Input*/}
          {/*      type="text"*/}
          {/*      value={user?.name}*/}
          {/*      onChange={(e) => handleInputChange('name', e.target.value)}*/}
          {/*  />*/}
          {/*</Form.Field>*/}
          <Form.Field>
            <label>Gender</label>
            <Form.Group inline>
              <Form.Field>
                <Radio
                    label="Male"
                    name="gender"
                    value="male"
                    checked={user?.gender === 'male'}
                    onChange={() => handleInputChange('gender', 'male')}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                    label="Female"
                    name="gender"
                    value="female"
                    checked={user?.gender === 'female'}
                    onChange={() => handleInputChange('gender', 'female')}
                />
              </Form.Field>
            </Form.Group>
          </Form.Field>
          <Form.Field>
            <label>Birth Date</label>
            <input
                type="date"
                value={user?.birth_date}
                onChange={(e) => handleInputChange('birth_date', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <Input
                type="text"
                value={user?.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Phone</label>
            <Input
                type="tel" // Specify input type as telephone
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" // Specify a pattern if needed, e.g., 123-456-7890
                placeholder="Enter phone number"
                value={user?.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
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
