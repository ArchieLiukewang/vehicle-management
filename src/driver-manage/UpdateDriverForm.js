// UpdateForm.js

import React, {useEffect, useState} from 'react';

const UpdateDriverForm = ({ driver, onUpdate , isAddDriver}) => {
  const defaultDriver = {
    id_card_number: 'please add id card number here',
    name: 'John Doe',
    gender: 'Male',
    birth_date: '1900-01-01',
    address: '123 Main St, Cityville',
    phone: '555-1234',
    license_number: 'ABC123XYZ',
  };

  const [updatedDriver, setUpdatedDriver] = useState(driver || defaultDriver);


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
              value={updatedDriver.id_card_number}
              readOnly = {!isAddDriver}
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
