import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import UpdateForm from './UpdateUserForm';

const UserManage = () => {
  const [users, setUsers] = useState([]);
  // const [rentalData, setRentalData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  // const [isRentalModalOpen, setRentalModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch all vehicles on component mount
    axios.get('http://localhost:5000/api/users/all')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);


const handleUpdateUser = (e,oldUser) => {   
    setSelectedUser(oldUser);
    setModalOpen(true);
  };



  const handleSubmitUser = (updatedUser) => {
    // Update the database or perform any necessary action
    // Here you can use Axios or another method to send the updatedVehicle data to your backend
    
    axios.put(`http://localhost:5000/api/users/update/${selectedUser.user_id}`, updatedUser)
    .then(response => {
      console.log('User updated successfully:', response.data);
      // Refresh the vehicles list after update
      axios.get('http://localhost:5000/api/users/all')
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error fetching vehicles:', error));
    })
    .catch(error => console.error('Error updating vehicle:', error));

    // ...

    // Update the state with the new data

    setSelectedUser(null);
    setModalOpen(false);


  };


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

  return (
    <div>
      <h1>User Information Management</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={tableCellStyle}>User Name</th>
              {(sessionStorage.getItem('user_type') == 'admin' ||  sessionStorage.getItem('user_type') == 'system_admin')&&

                  <th style={tableCellStyle}>Password</th>
              }
            <th style={tableCellStyle}>User Type</th>
              {(sessionStorage.getItem('user_type') == 'admin' ||  sessionStorage.getItem('user_type') == 'system_admin')&&

                  <th style={tableCellStyle}>Actions</th>
              }
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td style={tableCellStyle}>{user.username}</td>
                {(sessionStorage.getItem('user_type') == 'admin' ||  sessionStorage.getItem('user_type') == 'system_admin')&&

                    <td style={tableCellStyle}>{user.password}</td>
                }
              <td style={tableCellStyle}>{user.user_type}</td>
                {(sessionStorage.getItem('user_type') == 'admin' ||  sessionStorage.getItem('user_type') == 'system_admin')&&

                    <td style={tableCellStyle}>
                <button onClick={(e) => handleUpdateUser(e, user)}>
                  Update User
                </button>
                <br></br>                

                {/* <button onClick={(e) => handleQueryRental(e, vehicle)}>
                Query Rental Information
                </button> */}
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
        {selectedUser && (
          <div>
            <UpdateForm user={selectedUser} onUpdate={handleSubmitUser} />
          </div>
        )}
      </Modal>

    </div>
  );
  
  

};

export default UserManage;
