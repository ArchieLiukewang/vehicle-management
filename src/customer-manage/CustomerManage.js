import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Modal,Table, Container, Header, Button} from 'semantic-ui-react';
import UpdateForm from './UpdateCustomerForm';


const CustomerManage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddCustomer,setAddCustomer] = useState(false);
  // const [rentalData, setRentalData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch all customers on component mount
    axios.get('http://localhost:5000/api/customers/all')
        .then(response => setCustomers(response.data))
        .catch(error => console.error('Error fetching customers:', error));
  }, []);

    const handleSubmitCustomer = (updatedCustomer) => {
        // Update the database or perform any necessary action
        // Here you can use Axios or another method to send the updatedVehicle data to your backend
        if(isAddCustomer){
            axios.post(`http://localhost:5000/api/customers/add`, updatedCustomer)
                .then(response => {
                    console.log('Customer updated successfully:', response.data);
                    // Refresh the vehicles list after update
                    axios.get('http://localhost:5000/api/customers/all')
                        .then(response => setCustomers(response.data))
                        .catch(error => console.error('Error fetching vehicles:', error));
                })
                .catch(error => console.error('Error updating vehicle:', error));
        }else {
            axios.put(`http://localhost:5000/api/customers/update/${selectedCustomer.id_card_number}`, updatedCustomer)
                .then(response => {
                    console.log('Customer updated successfully:', response.data);
                    // Refresh the vehicles list after update
                    axios.get('http://localhost:5000/api/customers/all')
                        .then(response => setCustomers(response.data))
                        .catch(error => console.error('Error fetching vehicles:', error));
                })
                .catch(error => console.error('Error updating vehicle:', error));
        }
        // ...

        // Update the state with the new data

        setSelectedCustomer(null);
        setModalOpen(false);

    };

    const handleDeleteCustomer = (e, customer) => {
        axios.delete(`http://localhost:5000/api/customers/delete/${customer.id_card_number}`)
            .then(response => {
                console.log('Customer updated successfully:', response.data);
                // Refresh the vehicles list after update
                axios.get('http://localhost:5000/api/customers/all')
                    .then(response => setCustomers(response.data))
                    .catch(error => console.error('Error fetching customer:', error));
            })
            .catch(error => console.error('Error updating customer:', error));
    };
  return (
      <Container>
          <Header as="h1">Customers Information Management</Header>
          <Table celled striped>
              <Table.Header>
                  <Table.Row>
                      <Table.HeaderCell>Customer Id Number</Table.HeaderCell>
                      <Table.HeaderCell>Customer Name</Table.HeaderCell>
                      <Table.HeaderCell>Customer Gender</Table.HeaderCell>
                      <Table.HeaderCell>Customer Birth Date</Table.HeaderCell>
                      <Table.HeaderCell>Customer Address</Table.HeaderCell>
                      <Table.HeaderCell>Customer Phone</Table.HeaderCell>
                      <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
              </Table.Header>
              <Table.Body>
                  {customers.map((customer) => (
                      <Table.Row key={customer.id_card_number}>
                          <Table.Cell>{customer.id_card_number}</Table.Cell>
                          <Table.Cell>{customer.name}</Table.Cell>
                          <Table.Cell>{customer.gender}</Table.Cell>
                          <Table.Cell>{customer.birth_date}</Table.Cell>
                          <Table.Cell>{customer.address}</Table.Cell>
                          <Table.Cell>{customer.phone}</Table.Cell>
                          <Table.Cell>
                              {(sessionStorage.getItem("user_type") === 'admin' || sessionStorage.getItem("user_type") === 'system_admin') && (
                                  <div>
                                      <Button onClick={(e) => {
                                          setSelectedCustomer(customer);
                                          setModalOpen(true);
                                      }}>
                                          Update Customer
                                      </Button>

                                      <Button onClick={(e) => handleDeleteCustomer(e, customer)}>
                                          Delete Customer
                                      </Button>
                                  </div>
                              )}

                          </Table.Cell>
                      </Table.Row>
                  ))}
              </Table.Body>
          </Table>
          {sessionStorage.getItem("user_type") === 'admin' &&
              <Button onClick={(e) => {
                  setAddCustomer(true);
                  setModalOpen(true);
              }}>
                  Add Customer
              </Button>
          }

          <Modal
              open={isModalOpen}
              onClose={() => setModalOpen(false)}
              style={{
                  width: '30%', // Adjust the width as needed
                  margin: 'auto',
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              }}
          >
              {(selectedCustomer && !isAddCustomer) && (
                  <div>
                      <UpdateForm customer={selectedCustomer} onUpdate={handleSubmitCustomer}/>
                  </div>
              )}

              {isAddCustomer && (
                  <div>
                      <UpdateForm onUpdate={handleSubmitCustomer} isAddCustomer={isAddCustomer}/>
                  </div>
              )}
          </Modal>
      </Container>
  );
};

export default CustomerManage;
