import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import UpdateForm from './UpdateDriverForm';
import updateUserForm from "../user-info-manage/UpdateUserForm";

const DriverManage = () => {
  const [drivers, setDrivers] = useState([]);
    
    const [selectedDriver, setSelectedDrivers] = useState(null);
  // const [rentalData, setRentalData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  // const [isRentalModalOpen, setRentalModalOpen] = useState(false);
  // const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    // Fetch all vehicles on component mount
    axios.get('http://localhost:5000/drivers/all')
      .then(response => setDrivers(response.data))
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  // const handleVehicleClick = (vehicle) => {
  //   // Fetch rental information for the selected vehicle
  //   axios.get(`http://localhost:5000/api/rentals/${vehicle.plate_number}`)
  //     .then(response => {
  //       // Handle rental data as needed
  //       console.log('Rental information:', response.data);
  //     })
  //     .catch(error => console.error('Error fetching rentals:', error));

  //   // Set the selected vehicle for further operations
  //   setSelectedVehicle(vehicle);
  // };


// const handleUpdateVehicle = (e,oldVehicle) => {
 
   
//     setSelectedVehicle(oldVehicle);
//     setModalOpen(true);

//   };



  // const handleSubmitVehicle = (updatedVehicle) => {
  //   // Update the database or perform any necessary action
  //   // Here you can use Axios or another method to send the updatedVehicle data to your backend
    
  //   axios.put(`http://localhost:5000/api/vehicles/${selectedVehicle.plate_number}`, updatedVehicle)
  //   .then(response => {
  //     console.log('Vehicle updated successfully:', response.data);
  //     // Refresh the vehicles list after update
  //     axios.get('http://localhost:5000/api/vehicles')
  //       .then(response => setVehicles(response.data))
  //       .catch(error => console.error('Error fetching vehicles:', error));
  //   })
  //   .catch(error => console.error('Error updating vehicle:', error));

  //   // ...

  //   // Update the state with the new data
    
  //   setSelectedVehicle(null);
  //   setModalOpen(false);


  // };


  // const handleQueryRental = (e,vehicle) => {
    
  //   const plateNumber = vehicle.plate_number;

  //   axios.get(`http://localhost:5000/api/rentals/${plateNumber}`)
  //     .then(response => {
  //       const fetchedRentalData = response.data;
  //       setRentalData(fetchedRentalData);
  //       console.log('Rental Data:', fetchedRentalData);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching rental information:', error);
  //     });

  //     setSelectedVehicle(vehicle)
  //     setRentalModalOpen(true)

  // };


//   css
  const tableCellStyle = {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
  };

    const handleSubmitDriver=(updatedDriver) => {
        return undefined;
    };

  const handleUpdateDriver = (e, SelectedDriver) => {
      debugger;
    setSelectedDrivers(SelectedDriver);
    setModalOpen(true);

  };
  return (
    <div>
      <h1>Drivers Information Management</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
        <tr>
          <th style={tableCellStyle}>Driver id_card_number</th>
          <th style={tableCellStyle}>Driver name</th>
          <th style={tableCellStyle}>Driver gender</th>
          <th style={tableCellStyle}>Driver birth date</th>
          <th style={tableCellStyle}>Driver address</th>
          <th style={tableCellStyle}>Driver phone</th>
          <th style={tableCellStyle}>Driver license</th>
          <th style={tableCellStyle}>Driver Action</th>
        </tr>
        </thead>
        <tbody>
        {drivers.map((driver) => (


              (sessionStorage.getItem('username') == driver.name ||sessionStorage.getItem('user_type')=='admin'||
                  sessionStorage.getItem('user_type')=='customer')&&


                    (<tr>
                      <td style={tableCellStyle}>{driver.id_card_number}</td>
                      <td style={tableCellStyle}>{driver.name}</td>
                      <td style={tableCellStyle}>{driver.gender}</td>
                      <td style={tableCellStyle}>{driver.birth_date}</td>
                      <td style={tableCellStyle}>{driver.address}</td>
                      <td style={tableCellStyle}>{driver.phone}</td>
                      <td style={tableCellStyle}>{driver.license_number}</td>
                      <button onClick={(e) => handleUpdateDriver(e, driver)}>
                        Update Driver
                      </button>
                      <br></br>


                    </tr>)


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
        {selectedDriver && (
            <div>
              <UpdateForm user={selectedDriver} onUpdate={handleSubmitDriver} />
            </div>
        )}
      </Modal>
    </div>
  );
  
  

};

export default DriverManage;
