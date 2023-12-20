// UpdateForm.js

import React, { useState } from 'react';

const UpdateDriverForm = ({ driver, onUpdate }) => {
  const [updatedDriver, setUpdatedDriver] = useState(driver);

  const handleInputChange = (field, value) => {
    setUpdatedDriver((prevDriver) => ({ ...prevDriver, [field]: value }));
  };

  const handleSubmit = () => {
    // Call the onUpdate function from the parent component
    onUpdate(updatedDriver);
  };

  return (
    <div>
      <h2>Update Driver</h2>
      <form>

        <label>
          Driver Name:
          <input
              type="text"
              value={driver.id_card_number}
              readOnly
              onChange={(e) => handleInputChange('id_card_number', e.target.value)}
          />
        </label>

        <br/>


          <label>
            Driver Name:
            <input
                type="text"
                value={updatedDriver.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </label>
          <br/>

          <label>
            Gender:
            <input
                type="text"
                value={updatedDriver.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
            />
          </label>
          <br/>

          <label>
            Birth Date:
            <input
                type="txt"
                value={updatedDriver.birth_date}
                onChange={(e) => handleInputChange('birth_date', e.target.value)}
            />
          </label>
          <br/>

          <label>
            Address:
            <input
                type="text"
                value={updatedDriver.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </label>
          <br/>

          <label>
            Phone:
            <input
                type="text"
                value={updatedDriver.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </label>
          <br/>

          <label>
            License Number:
            <input
                type="text"
                value={updatedDriver.license_number}
                onChange={(e) => handleInputChange('license_number', e.target.value)}
            />
          </label>



        {/* Add similar input fields for other vehicle fields */}
        <br/>
        <button type="button" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </div>
  );
};

export default UpdateDriverForm;
