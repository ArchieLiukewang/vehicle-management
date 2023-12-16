// UpdateForm.js

import React, { useState } from 'react';

const UpdateUserForm = ({ user, onUpdate }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleInputChange = (field, value) => {
    setUpdatedUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const handleSubmit = () => {
    // Call the onUpdate function from the parent component
    onUpdate(updatedUser);
  };

  return (
    <div>
      <h2>Update User</h2>
      <form>
        <label>
          User Name:
          <input
            type="text"
            value={updatedUser.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
          />
        </label>
        <br />
        <label>
          User Name:
          <input
            type="text"
            value={updatedUser.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
        </label>
        <br />
        <label>
          User Type:
          <input
            type="text"
            value={updatedUser.user_type}
            onChange={(e) => handleInputChange('user_type', e.target.value)}
          />
        </label>
        <br />

        <button type="button" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
