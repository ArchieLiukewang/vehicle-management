import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import Modal from 'react-modal';
import UpdateForm from './UpdateVehicleForm';
import RentVehicleForm from "./RentVehicleForm";
import { Button, Modal, Table } from 'semantic-ui-react'



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
        updatedRental.plate_number = selectedVehicle.plate_number;
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
            <Table celled style={{ width: '100%' }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Vehicle Name</Table.HeaderCell>
                        <Table.HeaderCell>Plate Number</Table.HeaderCell>
                        <Table.HeaderCell>Vehicle Type</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Purchase Date</Table.HeaderCell>
                        <Table.HeaderCell>Vehicle Condition</Table.HeaderCell>
                        <Table.HeaderCell>Rental Rate</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {vehicles.map((vehicle) => (
                        <Table.Row key={vehicle.plate_number}>
                            <Table.Cell>{vehicle.vehicle_name}</Table.Cell>
                            <Table.Cell>{vehicle.plate_number}</Table.Cell>
                            <Table.Cell>{vehicle.vehicle_type}</Table.Cell>
                            <Table.Cell>{vehicle.price}</Table.Cell>
                            <Table.Cell>{vehicle.purchase_date}</Table.Cell>
                            <Table.Cell>{vehicle.vehicle_condition}</Table.Cell>
                            <Table.Cell>{vehicle.rental_rate}</Table.Cell>
                            <Table.Cell>
                                {(sessionStorage.getItem("user_type") === 'admin' || sessionStorage.getItem("user_type") === 'system_admin') && (
                                    <div>
                                        <Button onClick={(e) => handleUpdateVehicle(e, vehicle)}>
                                            Update Vehicle
                                        </Button>
                                        <Button onClick={(e) => handleDeleteVehicle(e, vehicle)}>
                                            Delete Vehicle
                                        </Button>
                                    </div>
                                )}
                                <Button onClick={(e) => handleQueryRental(e, vehicle)}>
                                    Query Rental Information
                                </Button>
                                <Button onClick={(e) => { setSelectedVehicle(vehicle); setRentVehicleModalOpen(true); }}>
                                    Rent Vehicle
                                </Button>
                                <Button onClick={(e) => handleReturnVehicle(e, vehicle)}>
                                    Return Vehicle
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            {sessionStorage.getItem("user_type") === 'admin' &&
                <Button onClick={(e) => { setAddVehicle(true); setModalOpen(true); }}>
                    Add Vehicle
                </Button>
            }

            <Modal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                style={ {
                    width: '30%', // Adjust the width as needed
                    margin: 'auto',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                {(selectedVehicle && !isAddVehicle) && (
                    <div>
                        <UpdateForm vehicle={selectedVehicle} onUpdate={handleSubmitVehicle} />
                    </div>
                )}

                {isAddVehicle && (
                    <div>
                        <UpdateForm onUpdate={handleSubmitVehicle} isAddVehicle={isAddVehicle} />
                    </div>
                )}
            </Modal>

            <Modal
                open={isRentalModalOpen}
                onClose={() => {setRentalModalOpen(false);setRentalData(null)}}
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
                        <Table celled style={{ width: '100%' }}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Rental Mode</Table.HeaderCell>
                                    <Table.HeaderCell>Rental Period</Table.HeaderCell>
                                    <Table.HeaderCell>Deposit</Table.HeaderCell>
                                    <Table.HeaderCell>Rental Start Date</Table.HeaderCell>
                                    <Table.HeaderCell>Rental End Date</Table.HeaderCell>
                                    <Table.HeaderCell>Amount Received</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {rentalData.map((rental) => (
                                    <Table.Row key={rental.id_card_number}>
                                        <Table.Cell>{rental.rental_mode}</Table.Cell>
                                        <Table.Cell>{rental.rental_period}</Table.Cell>
                                        <Table.Cell>{rental.deposit}</Table.Cell>
                                        <Table.Cell>{rental.rental_start_date}</Table.Cell>
                                        <Table.Cell>{rental.rental_end_date}</Table.Cell>
                                        <Table.Cell>{rental.amount_received}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                )}
            </Modal>

            <Modal
                open={isRentVehicleModalOpen}
                onClose={() => setRentVehicleModalOpen(false)}
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
                        <RentVehicleForm selectedVehicle={selectedVehicle} onUpdate={handleSubmitRentVehicle} />
                    </div>
                )}
            </Modal>
        </div>
    );


};

export default VehicleManagement;
