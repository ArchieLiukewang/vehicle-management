// UpdateForm.js

import React, { useState } from 'react';
import {Button, Form, Input} from "semantic-ui-react";

const UpdateCustomerForm = ({ customer, onUpdate, isAddCustomer }) => {
  const defaultCustomer = {
    id_card_number: '12345678901234567890', // Replace with a specific ID card number
    name: 'John Doe', // Replace with a specific name
    gender: 'Male', // Replace with a specific gender
    birth_date: '1990-01-01', // Replace with a specific birth date
    address: '123 Main St, City, Country', // Replace with a specific address
    phone: '123-456-7890', // Replace with a specific phone number
  };

  const title = isAddCustomer? 'Add Customer' : 'Update Customer';
  const [updatedCustomer, setUpdatedCustomer] = useState(customer || defaultCustomer);

  const handleInputChange = (field, value) => {
    setUpdatedCustomer((prevCustomer) => ({ ...prevCustomer, [field]: value }));
  };

  const handleSubmit = () => {
    // Call the onUpdate function from the parent component
    onUpdate(updatedCustomer);
  };

  return (
      <div>
        <h2>{title}</h2>
        <Form>
          <Form.Field>
            <label>Name:</label>
            <Input
                type="text"
                value={updatedCustomer.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>ID Card Number:</label>
            <Input
                type="text"
                value={updatedCustomer.id_card_number}
                onChange={(e) => handleInputChange('id_card_number', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Gender:</label>
            <Input
                type="text"
                value={updatedCustomer.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Birth Date:</label>
            <Input
                type="date"
                value={updatedCustomer.birth_date}
                onChange={(e) => handleInputChange('birth_date', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Address:</label>
            <Input
                type="text"
                value={updatedCustomer.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Phone:</label>
            <Input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" // Specify your desired phone number pattern
                placeholder="123-456-7890"
                value={updatedCustomer.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </Form.Field>

          {/* Add similar Form.Field components for other customer fields */}

          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
  );
};

export default UpdateCustomerForm;
