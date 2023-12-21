import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import UpdateForm from './UpdateVehicleForm';
import RentVehicleForm from "./RentVehicleForm";

const VehicleManagement = () => {
    const [vehicles, setVehicles] = useState([]);
    const [rentalData, setRentalData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isRentalModalOpen, setRentalModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [isRentVehicleModalOpen,setRentVehicleModalOpen] = useState(false);
    const[isAddVehicle,setAddVehicle] = useState(false);

    useEffect(() => {
        // Fetch all vehicles on component mount
        axios.get('http://localhost:5000/api/vehicles')
            .then(response => setVehicles(response.data))
            .catch(error => console.error('Error fetching vehicles:', error));
    }, []);

    const handleVehicleClick = (vehicle) => {
        // Fetch rental information for the selected vehicle
        axios.get(`http://localhost:5000/api/rentals/${vehicle.plate_number}`)
            .then(response => {
                // Handle rental data as needed
                console.log('Rental information:', response.data);
            })
            .catch(error => console.error('Error fetching rentals:', error));

        // Set the selected vehicle for further operations
        setSelectedVehicle(vehicle);
    };


    const handleUpdateVehicle = (e, oldVehicle) => {


        setSelectedVehicle(oldVehicle);
        setModalOpen(true);

    };


    const handleSubmitVehicle = (updatedVehicle) => {
        // Update the database or perform any necessary action
        // Here you can use Axios or another method to send the updatedVehicle data to your backend
        if(isAddVehicle){
            axios.post(`http://localhost:5000/api/vehicles/add`, updatedVehicle)
                .then(response => {
                    console.log('Vehicle updated successfully:', response.data);
                    // Refresh the vehicles list after update
                    axios.get('http://localhost:5000/api/vehicles')
                        .then(response => setVehicles(response.data))
                        .catch(error => console.error('Error fetching vehicles:', error));
                })
                .catch(error => console.error('Error updating vehicle:', error));
        }else {
            axios.put(`http://localhost:5000/api/vehicles/${selectedVehicle.plate_number}`, updatedVehicle)
                .then(response => {
                    console.log('Vehicle updated successfully:', response.data);
                    // Refresh the vehicles list after update
                    axios.get('http://localhost:5000/api/vehicles')
                        .then(response => setVehicles(response.data))
                        .catch(error => console.error('Error fetching vehicles:', error));
                })
                .catch(error => console.error('Error updating vehicle:', error));
        }
        // ...

        // Update the state with the new data

        setSelectedVehicle(null);
        setModalOpen(false);


    };


    const handleQueryRental = (e, vehicle) => {

        const plateNumber = vehicle.plate_number;

        axios.get(`http://localhost:5000/api/rentals/${plateNumber}`)
            .then(response => {
                const fetchedRentalData = response.data;
                setRentalData(fetchedRentalData);
                console.log('Rental Data:', fetchedRentalData);
            })
            .catch(error => {
                console.error('Error fetching rental information:', error);
            });

        setSelectedVehicle(vehicle)
        setRentalModalOpen(true)

    };




    const handleRentVehicle = (e, selectedVehicle) => {
            setRentVehicleModalOpen(true);
            setSelectedVehicle(selectedVehicle);
    };



    //   css
    const tableCellStyle = {
        border: '1px solid #dddddd',
        padding: '8px',
        textAlign: 'left',
    };

    const handleSubmitRentVehicle = (updatedRental) => {
        console.log("updated Rental" + updatedRental);
        axios.put(`http://localhost:5000/api/add-rental`, updatedRental)
            .then(response => {
                console.log('Rental updated successfully:', response.data);
                selectedVehicle.vehicle_condition = 'under_rented';
                axios.put(`http://localhost:5000/api/vehicles/${selectedVehicle.plate_number}`, selectedVehicle)
                    .then(response => {
                        console.log('Vehicle updated successfully:', response.data);
                        // Refresh the vehicles list after update
                        axios.get('http://localhost:5000/api/vehicles')
                            .then(response => setVehicles(response.data))
                            .catch(error => console.error('Error fetching vehicles:', error));
                    })
                    .catch(error => console.error('Error updating vehicle:', error));

            })
            .catch(error => console.error('Error updating vehicle:', error));

        // ...

        // Update the state with the new data

        setSelectedVehicle(null);
        setRentVehicleModalOpen(false);


    };


    const handleReturnVehicle = (e, selectedVehicle) => {

        selectedVehicle.vehicle_condition = 'unused';

        axios.put(`http://localhost:5000/api/vehicles/${selectedVehicle.plate_number}`, selectedVehicle)
            .then(response => {
                console.log('Vehicle updated successfully:', response.data);
                axios.put(`http://localhost:5000/api/return-vehicle/${selectedVehicle.plate_number}`)
                    .catch(error => console.error('Error updating vehicle:', error));


                // Refresh the vehicles list after update
                axios.get('http://localhost:5000/api/vehicles')
                    .then(response => setVehicles(response.data))
                    .catch(error => console.error('Error fetching vehicles:', error));
            })
            .catch(error => console.error('Error updating vehicle:', error));

        return ;
    };


    const handleAddVehicle = (e) => {
        setAddVehicle(true);
        setModalOpen(true);
    };
    const handleDeleteVehicle = (e, vehicle) => {
        axios.delete(`http://localhost:5000/api/vehicles/delete/${vehicle.plate_number}`)
            .then(response => {
                console.log('Vehicle updated successfully:', response.data);
                // Refresh the vehicles list after update
                axios.get('http://localhost:5000/api/vehicles')
                    .then(response => setVehicles(response.data))
                    .catch(error => console.error('Error fetching vehicles:', error));
            })
            .catch(error => console.error('Error updating vehicle:', error));
    };
    return (
        <div>
            <h1>Vehicle Information Management</h1>
            <table style={{borderCollapse: 'collapse', width: '100%'}}>
                <thead>
                <tr>
                    <th style={tableCellStyle}>Vehicle Name</th>
                    <th style={tableCellStyle}>Plate Number</th>
                    <th style={tableCellStyle}>Vehicle Type</th>
                    <th style={tableCellStyle}>Price</th>
                    <th style={tableCellStyle}>Purchase Date</th>
                    <th style={tableCellStyle}>Vehicle Condition</th>
                    <th style={tableCellStyle}>Rental Rate</th>
                    <th style={tableCellStyle}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {vehicles.map((vehicle) => (
                    <tr>
                        <td style={tableCellStyle}>{vehicle.vehicle_name}</td>
                        <td style={tableCellStyle}>{vehicle.plate_number}</td>
                        <td style={tableCellStyle}>{vehicle.vehicle_type}</td>
                        <td style={tableCellStyle}>{vehicle.price}</td>
                        <td style={tableCellStyle}>{vehicle.purchase_date}</td>
                        <td style={tableCellStyle}>{vehicle.vehicle_condition}</td>
                        <td style={tableCellStyle}>{vehicle.rental_rate}</td>
                        <td style={tableCellStyle}>

                            {

                                (sessionStorage.getItem("user_type") == 'admin' || sessionStorage.getItem("user_type") == 'system_admin') && (
                                    <div>
                                        <button onClick={(e) => handleUpdateVehicle(e, vehicle)}>
                                            Update Vehicle
                                        </button>
                                        <br></br>
                                        <button onClick={(e) => handleDeleteVehicle(e, vehicle)}>
                                            Delete Vehicle
                                        </button>
                                        <br></br>
                                    </div>
                                )
                            }
                            <button onClick={(e) => handleQueryRental(e, vehicle)}>
                                Query Rental Information
                            </button>

                            <br></br>
                            <button onClick={(e) => handleRentVehicle(e, vehicle)}>
                                Rent Vehicle
                            </button>

                            <br></br>
                            <button onClick={(e) => handleReturnVehicle(e, vehicle)}>
                                Return Vehicle
                            </button>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {(sessionStorage.getItem("user_type") == 'admin' )&&
            <button onClick={(e) => handleAddVehicle(e)}>
                Add Vehicle
            </button>
            }

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
                {selectedVehicle && (
                    <div>
                        <UpdateForm vehicle={selectedVehicle} onUpdate={handleSubmitVehicle}/>
                    </div>
                )}

                {isAddVehicle && (
                    <div>
                        <UpdateForm  onUpdate={handleSubmitVehicle} isAddVehicle={isAddVehicle}/>
                    </div>
                )}
            </Modal>

            <Modal
                isOpen={isRentalModalOpen}
                onRequestClose={() => setRentalModalOpen(false)}
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
                {rentalData && selectedVehicle && rentalData.length > 0 && (
                    <div>
                        <h2>Rental Information: {selectedVehicle.vehicle_name} - {selectedVehicle.plate_number}</h2>
                        <table style={{borderCollapse: 'collapse', width: '100%'}}>
                            <thead>
                            <tr>
                                <th style={tableCellStyle}>Rental Mode</th>
                                <th style={tableCellStyle}>Rental Period</th>
                                <th style={tableCellStyle}>Deposit</th>
                                <th style={tableCellStyle}>Rental Start Date</th>
                                <th style={tableCellStyle}>Rental End Date</th>
                                <th style={tableCellStyle}>Amount Received</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rentalData.map((rental) => (
                                <tr key={rental.id_card_number}>
                                    <td style={tableCellStyle}>{rental.rental_mode}</td>
                                    <td style={tableCellStyle}>{rental.rental_period}</td>
                                    <td style={tableCellStyle}>{rental.deposit}</td>
                                    <td style={tableCellStyle}>{rental.rental_start_date}</td>
                                    <td style={tableCellStyle}>{rental.rental_end_date}</td>
                                    <td style={tableCellStyle}>{rental.amount_received}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </Modal>

            <Modal
                isOpen={isRentVehicleModalOpen}
                onRequestClose={() => setRentVehicleModalOpen(false)}
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
                {selectedVehicle && (
                    <div>
                        <RentVehicleForm vehicle={selectedVehicle} onUpdate={handleSubmitRentVehicle}/>
                    </div>
                )}
            </Modal>
        </div>
    );


};

export default VehicleManagement;
