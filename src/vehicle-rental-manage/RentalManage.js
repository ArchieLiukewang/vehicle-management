import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import UpdateForm from './UpdateRentalForm';

const RentalMange = () => {
  const [rentals, setRentals] = useState([]);
  // const [rentalData, setRentalData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);

  const [contractDetails, setContractDetails] = useState(null);

  useEffect(() => {
    // Fetch all vehicles on component mount
    axios.get('http://localhost:5000/rentals/all')
      .then(response => setRentals(response.data))
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);



  const handleGenerateContract = (rental) => {
    try {
      // Make an API call to generate the contract
      axios.get(`http://localhost:5000/api/generate-contract/${rental.rental_id}`)
      .then(response => {

      setContractDetails(response.data);
      setModalOpen(true);
        console.log('Rental information:', response.data);
      })
      .catch(error => console.error('Error fetching rentals:', error))

      // Open the modal with the contract details
    
    } catch (error) {
      console.error('Error generating contract:', error.message);
    }

  };
  const handleUpdateRental = (selectedRental) => {
 
   
    setSelectedRental(selectedRental);
    setUpdateModalOpen(true);

  };


const handleSubmitRental = (updatedRental) => {
    // Update the database or perform any necessary action
    // Here you can use Axios or another method to send the updatedVehicle data to your backend
    
    axios.put(`http://localhost:5000/api/update-rental/${updatedRental.rental_id}`, updatedRental)
    .then(response => {
      console.log('Rental updated successfully:', response.data);
      // Refresh the vehicles list after update
      axios.get('http://localhost:5000/rentals/all')
        .then(response => setRentals(response.data))
        .catch(error => console.error('Error fetching vehicles:', error));
    })
    .catch(error => console.error('Error updating vehicle:', error));

    // ...

    // Update the state with the new data
    
    setSelectedRental(null);
    setUpdateModalOpen(false);


  };

  const closeModal = () => {
    setModalOpen(false);
    setContractDetails(null);
  };




//   css
  const tableCellStyle = {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
  };

  return (
    <div>
      <h1>Rental Information Management</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={tableCellStyle}>Rental id</th>
            <th style={tableCellStyle}>driver id</th>
            <th style={tableCellStyle}>Plate Number</th>
            <th style={tableCellStyle}>Customer ID Card</th>
            <th style={tableCellStyle}>Rental Mode</th>
            <th style={tableCellStyle}>Rental Rate</th>
            <th style={tableCellStyle}>Rental Period</th>
            <th style={tableCellStyle}>Deposit</th>
            <th style={tableCellStyle}>Rental Start Date </th>
            <th style={tableCellStyle}>Rental End Date</th>
            <th style={tableCellStyle}>Amount Recieved</th>
              {(sessionStorage.getItem('user_type') == 'admin' ||  sessionStorage.getItem('user_type') == 'system_admin')&&
                  <th style={tableCellStyle}>Action</th>
              }
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr>
              <td style={tableCellStyle}>{rental.rental_id}</td>
              <td style={tableCellStyle}>{rental.driver_id}</td>
              <td style={tableCellStyle}>{rental.plate_number}</td>
              <td style={tableCellStyle}>{rental.id_card_number}</td>
              <td style={tableCellStyle}>{rental.rental_mode}</td>
              <td style={tableCellStyle}>{rental.rental_rate}</td>
              <td style={tableCellStyle}>{rental.rental_period}</td>
              <td style={tableCellStyle}>{rental.deposit}</td>
              <td style={tableCellStyle}>{rental.rental_start_date}</td>
              <td style={tableCellStyle}>{rental.rental_end_date}</td>
              <td style={tableCellStyle}>{rental.amount_received}</td>
                {(sessionStorage.getItem('user_type') == 'admin' ||  sessionStorage.getItem('user_type') == 'system_admin')&&

                    <td style={tableCellStyle}>
                
                <button onClick={(e) => handleGenerateContract(rental)}>
                  Generate Contract
                </button>

                <button onClick={(e) => handleUpdateRental(rental)}>
                  Update
                </button>
                <br></br>                
              </td>
                }
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '50%',
            margin: 'auto',
            padding: '20px',
          },
        }}
      >
        {contractDetails && (
         <div>
         <h2>Rental Contract</h2>
         <p>Date: {new Date().toLocaleDateString()}</p>
         <hr />
         <p>
           This Rental Agreement is entered into by and between the parties
           below, hereinafter called the "Lessor" and the "Lessee."
         </p>
         <hr />
         <p>Details:</p>
         <p>
  <strong>Details:</strong>
</p>
<ul>
  <li>
    <strong>Lessee Information:</strong>
    <ul>
      <li>Name: {contractDetails.name}</li>
      <li>ID Card Number: {contractDetails.id_card_number}</li>
      <li>Gender: {contractDetails.gender}</li>
      <li>Birth Date: {new Date(contractDetails.birth_date).toLocaleDateString()}</li>
      <li>Address: {contractDetails.address}</li>
      <li>Phone: {contractDetails.phone}</li>
    </ul>
  </li>
  <li>
    <strong>Vehicle Information:</strong>
    <ul>
      <li>Plate Number: {contractDetails.plate_number}</li>
      <li>Vehicle Type: {contractDetails.vehicle_type}</li>
      <li>Vehicle Name: {contractDetails.vehicle_name}</li>
      <li>Price: ${contractDetails.price}</li>
      <li>Purchase Date: {new Date(contractDetails.purchase_date).toLocaleDateString()}</li>
      <li>Vehicle Condition: {contractDetails.vehicle_condition}</li>
    </ul>
  </li>
  <li>
    <strong>Rental Information:</strong>
    <ul>
      <li>Rental Mode: {contractDetails.rental_mode}</li>
      <li>Rental Rate: ${contractDetails.rental_rate} per day</li>
      <li>Rental Period: {contractDetails.rental_period} days</li>
      <li>Rental Start Date: {new Date(contractDetails.rental_start_date).toLocaleDateString()}</li>
      <li>Rental End Date: {new Date(contractDetails.rental_end_date).toLocaleDateString()}</li>
    </ul>
  </li>
  <li>
    <strong>Financials:</strong>
    <ul>
      <li>Deposit: ${contractDetails.deposit}</li>
      <li>Amount Received: ${contractDetails.amount_received}</li>
    </ul>
  </li>
</ul>
<hr />

         <p>
           <strong>Terms and Conditions:</strong>
         </p>
         <p>
           The Lessee agrees to rent the vehicle described above for the period
           specified at the rental rate of ${contractDetails.rental_rate} per day.
           The rental period begins on{' '}
           {new Date(contractDetails.rental_start_date).toLocaleDateString()}{' '}
           and ends on{' '}
           {new Date(contractDetails.rental_end_date).toLocaleDateString()}.
         </p>
         <p>
           A deposit of ${contractDetails.deposit} is required, which will be
           refunded upon the return of the vehicle in good condition.
         </p>
         {/* Add more terms and conditions as needed */}
         <hr />
         <p>Lessee's Signature: ________________________</p>
         <p>Lessor's Signature: ________________________</p>
         {/* Close button */}
         
       </div>
          
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>


          {/* update Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setUpdateModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '50%',
            margin: 'auto',
            padding: '20px',
          },
        }}
      >
        {selectedRental && (
            <div>
              <h2>Update Rental Information:</h2>
              <UpdateForm selectedRental={selectedRental} onUpdate={handleSubmitRental} />
            </div>
          )}

      </Modal>  
      { 
      }
    </div>
  );
  
  

};

export default RentalMange;
