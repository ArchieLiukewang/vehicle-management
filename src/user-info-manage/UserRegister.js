// UpdateForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
    <div>
      <h2>Update User</h2>
      <form>
        <label>
          User Name:
          <input
            type="text"
            value={user?.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="text"
            value={user?.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
        </label>
        <br />
        {/* <label>
          User Type:
          <input
            type="text"
            value={user.user_type}
            onChange={(e) => handleInputChange('user_type', e.target.value)}
          />
        </label>
        <br /> */}

        <button type="button" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </div>
  );
};

export default UserRegister;
