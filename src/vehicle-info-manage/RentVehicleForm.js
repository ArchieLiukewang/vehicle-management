// UpdateForm.js

import React, { useState } from 'react';

const RentVehicleForm = ({ selectedVehicle, onUpdate }) => {
  const [updatedRental, setUpdatedRental] = useState({
    driver_id: '12345',
    plate_number: 'ABC123', // Add your default plate_number value
    id_card_number: 'ID123', // Add your default id_card_number value
    rental_mode: 'Monthly', // Add your default rental_mode value
    rental_rate: 1000, // Add your default rental_rate value
    rental_period: 6, // Add your default rental_period value
    deposit: 2000, // Add your default deposit value
    rental_start_date: '2023-12-20',
    rental_end_date: '2024-5-20', // Add your default rental_end_date value
    amount_received: 0.0, // Add your default amount_received value
  });

  const handleInputChange = (field, value) => {
    setUpdatedRental((prevRental) => ({ ...prevRental, [field]: value }));
  };

  const handleSubmit = () => {
    // Call the onUpdate function from the parent component
    onUpdate(updatedRental);
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }



  return (
      <div>
        <h2>Update Rental</h2>
        <form>

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
                value={selectedVehicle.plate_number}
                readOnly
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
                value={selectedVehicle.rental_rate}
                readOnly
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
                value='0'
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

export default RentVehicleForm;
