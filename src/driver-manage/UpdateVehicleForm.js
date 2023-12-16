// UpdateForm.js

import React, { useState } from 'react';

const UpdateVehicleForm = ({ vehicle, onUpdate }) => {
  const [updatedVehicle, setUpdatedVehicle] = useState(vehicle);

  const handleInputChange = (field, value) => {
    setUpdatedVehicle((prevVehicle) => ({ ...prevVehicle, [field]: value }));
  };

  const handleSubmit = () => {
    // Call the onUpdate function from the parent component
    onUpdate(updatedVehicle);
  };

  return (
    <div>
      <h2>Update Vehicle</h2>
      <form>
        <label>
          Vehicle Name:
          <input
            type="text"
            value={updatedVehicle.vehicle_name}
            onChange={(e) => handleInputChange('vehicle_name', e.target.value)}
          />
        </label>
        <br />
        <label>
          Plate Number:
          <input
            type="text"
            value={updatedVehicle.plate_number}
            onChange={(e) => handleInputChange('plate_number', e.target.value)}
          />
        </label>
        <br />
        <label>
          Vehicle Type:
          <input
            type="text"
            value={updatedVehicle.vehicle_type}
            onChange={(e) => handleInputChange('vehicle_type', e.target.value)}
          />
        </label>
        <br/>
        <label>
        Price:
          <input
            type="text"
            value={updatedVehicle.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
          />
        </label>
        <br />
        <label>
        Vehicle Condition:
          <input
            type="text"
            value={updatedVehicle.vehicle_condition}
            onChange={(e) => handleInputChange('vehicle_condition', e.target.value)}
          />
        </label>
        <br />
        <label>
        Rental Rate:
          <input
            type="text"
            value={updatedVehicle.rental_rate}
            onChange={(e) => handleInputChange('rental_rate', e.target.value)}
          />
        </label>
        
        {/* Add similar input fields for other vehicle fields */}
        <br />
        <button type="button" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </div>
  );
};

export default UpdateVehicleForm;
