import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import UpdateForm from './UpdateDriverForm';
import updateUserForm from "../user-info-manage/UpdateUserForm";

const DriverManage = () => {
  const [drivers, setDrivers] = useState([]);
    
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isAddDriver,setAddDriver] = useState(false);
  // const [rentalData, setRentalData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  // const [isRentalModalOpen, setRentalModalOpen] = useState(false);
  // const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    // Fetch all vehicles on component mount
    axios.get('http://localhost:5000/api/drivers/all')
      .then(response => setDrivers(response.data))
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);



//   css
  const tableCellStyle = {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
  };

    const handleSubmitDriver=(updatedDriver) => {
        if(isAddDriver){
            axios.post(`http://localhost:5000/api/drivers/add`, updatedDriver)
                .then(response => {
                    console.log('User added successfully:', response.data);
                    // Refresh the vehicles list after update
                    axios.get('http://localhost:5000/api/drivers/all')
                        .then(response => setDrivers(response.data))
                        .catch(error => console.error('Error fetching vehicles:', error));
                })
                .catch(error => console.error('Error updating vehicle:', error));

        }else {
            axios.put(`http://localhost:5000/api/drivers/update/${updatedDriver.id_card_number}`, updatedDriver)
                .then(response => {
                    console.log('User updated successfully:', response.data);
                    // Refresh the vehicles list after update
                    axios.get('http://localhost:5000/api/drivers/all')
                        .then(response => setDrivers(response.data))
                        .catch(error => console.error('Error fetching vehicles:', error));
                })
                .catch(error => console.error('Error updating vehicle:', error));
        }
        // ...

        // Update the state with the new data

        setSelectedDriver(null);
        setModalOpen(false);
    };

  const handleUpdateDriver = (e, SelectedDriver) => {
    setSelectedDriver(SelectedDriver);
    setModalOpen(true);

  };
    const handleAddDriver = (e) => {
        setAddDriver(true);
        setModalOpen(true);
    };
    const handleDeleteDriver = (e, driver) => {
        axios.delete(`http://localhost:5000/api/drivers/delete/${driver.id_card_number}`)
            .then(response => {
                console.log('User added successfully:', response.data);
                // Refresh the vehicles list after update
                axios.get('http://localhost:5000/api/drivers/all')
                    .then(response => setDrivers(response.data))
                    .catch(error => console.error('Error fetching vehicles:', error));
            })
            .catch(error => console.error('Error updating vehicle:', error));
    };

    return (
      <div>
          <h1>Drivers Information Management</h1>
          <table style={{borderCollapse: 'collapse', width: '100%'}}>
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


                  (sessionStorage.getItem('username') == driver.name || sessionStorage.getItem('user_type') == 'admin' ||
                      sessionStorage.getItem('user_type') == 'customer') &&


                  (<tr>
                      <td style={tableCellStyle}>{driver.id_card_number}</td>
                      <td style={tableCellStyle}>{driver.name}</td>
                      <td style={tableCellStyle}>{driver.gender}</td>
                      <td style={tableCellStyle}>{driver.birth_date}</td>
                      <td style={tableCellStyle}>{driver.address}</td>
                      <td style={tableCellStyle}>{driver.phone}</td>
                      <td style={tableCellStyle}>{driver.license_number}</td>
                      <td style={tableCellStyle}>
                          <button onClick={(e) => handleUpdateDriver(e, driver)}>
                              Update Driver
                          </button>
                          <br></br>
                          {(sessionStorage.getItem('user_type') === 'admin')&&
                              <button onClick={(e) => handleDeleteDriver(e, driver)}>
                              Delete Driver
                              </button>
                          }
                      </td>
                      <br></br>


                  </tr>)


              ))}
              </tbody>
          </table>

          <button onClick={(e) => handleAddDriver(e)}>
              Add Driver
          </button>


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
                      <UpdateForm driver={selectedDriver} onUpdate={handleSubmitDriver} isAddDriver={isAddDriver}/>
                  </div>
              )}

              {(sessionStorage.getItem('user_type')=='admin' && isAddDriver)  && (
                  <div>
                      <UpdateForm  onUpdate={handleSubmitDriver} isAddDriver={isAddDriver}/>
                  </div>
              )}
          </Modal>
      </div>
  );


};

export default DriverManage;
