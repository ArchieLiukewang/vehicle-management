// UpdateForm.js

import React, { useState } from 'react';
import {Button, Form, Input} from "semantic-ui-react";

const UpdateVehicleForm = ({ vehicle, onUpdate, isAddVehicle }) => {
  const defaultVehicle = {
    plate_number: 'please input plate number here',
    vehicle_type: 'Sedan',
    vehicle_name: 'Generic Vehicle',
    price: 20000.00,
    purchase_date: '2023-01-01',
    vehicle_condition: 'New',
    rental_rate: 100.00
  };

  const [updatedVehicle, setUpdatedVehicle] = useState(vehicle || defaultVehicle);

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
        <Form>
          <Form.Field>
            <label>Vehicle Name:</label>
            <Input
                type="text"
                value={updatedVehicle.vehicle_name}
                onChange={(e) => handleInputChange('vehicle_name', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Plate Number:</label>
            <Input
                type="text"
                readOnly={!isAddVehicle}
                value={updatedVehicle.plate_number}
                onChange={(e) => handleInputChange('plate_number', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Vehicle Type:</label>
            <Input
                type="text"
                value={updatedVehicle.vehicle_type}
                onChange={(e) => handleInputChange('vehicle_type', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Price:</label>
            <Input
                type="text"
                value={updatedVehicle.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Vehicle Condition:</label>
            <Input
                type="text"
                value={updatedVehicle.vehicle_condition}
                onChange={(e) => handleInputChange('vehicle_condition', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Rental Rate:</label>
            <Input
                type="text"
                value={updatedVehicle.rental_rate}
                onChange={(e) => handleInputChange('rental_rate', e.target.value)}
            />
          </Form.Field>

          {/* Add similar Form.Field components for other vehicle fields */}

          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
  );
};

export default UpdateVehicleForm;
