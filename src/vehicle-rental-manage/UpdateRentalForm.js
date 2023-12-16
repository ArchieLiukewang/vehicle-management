// UpdateForm.js

import React, { useState } from 'react';

const UpdateRentalForm = ({ selectedRental, onUpdate }) => {
  const [updatedRental, setUpdatedRental] = useState(selectedRental);

  const handleInputChange = (field, value) => {
    setUpdatedRental((prevVehicle) => ({ ...prevVehicle, [field]: value }));
  };

  const handleSubmit = () => {
    // Call the onUpdate function from the parent component
    onUpdate(updatedRental);
  };

  return (
    <div>
      <h2>Update Rental</h2>
      <form>
  <label>
    Rent ID:
    <input
      type="text"
      value={updatedRental.rental_id}
      readOnly
      onChange={(e) => handleInputChange('rental_id', e.target.value)}
    />
  </label>
  <br />
  <label>
    Driver ID:
    <input
      type="text"
      value={updatedRental.driver_id}
      onChange={(e) => handleInputChange('driver_id', e.target.value)}
    />
  </label>
  <br />
  <label>
    Plate Number:
    <input
      type="text"
      value={updatedRental.plate_number}
      onChange={(e) => handleInputChange('plate_number', e.target.value)}
    />
  </label>
  <br />
  <label>
    ID Card Number:
    <input
      type="text"
      value={updatedRental.id_card_number}
      onChange={(e) => handleInputChange('id_card_number', e.target.value)}
    />
  </label>
  <br />
  <label>
    Rental Mode:
    <input
      type="text"
      value={updatedRental.rental_mode}
      onChange={(e) => handleInputChange('rental_mode', e.target.value)}
    />
  </label>
  <br />
  <label>
    Rental Rate:
    <input
      type="text"
      value={updatedRental.rental_rate}
      onChange={(e) => handleInputChange('rental_rate', e.target.value)}
    />
  </label>
  <br />
  <label>
    Rental Period:
    <input
      type="text"
      value={updatedRental.rental_period}
      onChange={(e) => handleInputChange('rental_period', e.target.value)}
    />
  </label>
  <br />
  <label>
    Deposit:
    <input
      type="text"
      value={updatedRental.deposit}
      onChange={(e) => handleInputChange('deposit', e.target.value)}
    />
  </label>
  <br />
  <label>
    Rental Start Date:
    <input
      type="text"
      value={updatedRental.rental_start_date}
      onChange={(e) => handleInputChange('rental_start_date', e.target.value)}
    />
  </label>
  <br />
  <label>
    Rental End Date:
    <input
      type="text"
      value={updatedRental.rental_end_date}
      onChange={(e) => handleInputChange('rental_end_date', e.target.value)}
    />
  </label>
  <br />
  <label>
    Amount Received:
    <input
      type="text"
      value={updatedRental.amount_received}
      onChange={(e) => handleInputChange('amount_received', e.target.value)}
    />
  </label>
  <br />
  <button type="button" onClick={handleSubmit}>
    Submit
  </button>
</form>

    </div>
  );
};

export default UpdateRentalForm;
