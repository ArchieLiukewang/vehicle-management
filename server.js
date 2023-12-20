const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');

//cors
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'rental',
});

// Event handler for the process exit event
process.on('exit', () => {
  console.log('Closing MySQL connection pool');
  pool.end(); // Close the connection pool
});

// Event handler for Ctrl+C (SIGINT) and other termination signals
['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    console.log(`Received ${signal}. Closing MySQL connection pool`);
    process.exit(); // Exit the process
  });
});


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));


//api
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Validate that both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Execute a MySQL query to check if the user exists
  pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if the query returned any results
    if (results.length > 0) {
      // User is found, send a success response
      res.json({ success: true, message: 'Login successful' ,user_type:results[0].user_type});
    } else {
      // User is not found, send an authentication failure response
      res.status(401).json({ success: false, message: 'Invalid username or password'});
    }
  });
});




// Get all vehicles
app.get('/api/vehicles', (req, res) => {
  pool.query('SELECT * FROM vehicles', (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

// Update a vehicle by plate_number
app.put('/api/vehicles/:plate_number', (req, res) => {

  const { plate_number } = req.params;
  const updatedVehicleData = req.body;
  const {vehicle_type, vehicle_name, price, purchase_date, vehicle_condition, rental_rate} =  req.body;
  const formattedPurchaseDate = new Date(purchase_date).toISOString().split('T')[0];
  const values = [vehicle_type, vehicle_name, price, formattedPurchaseDate, vehicle_condition, rental_rate,plate_number];
  
  const sql = `
  UPDATE vehicles
  SET
    vehicle_type = ?,
    vehicle_name = ?,
    price = ?,
    purchase_date = ?,
    vehicle_condition = ?,
    rental_rate = ?
  WHERE plate_number = ?;
`;
  pool.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error updating vehicle:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ success: true, message: 'Vehicle updated successfully' });
  });
});





//************************************************************************* */
//rental

//get rentals by plate number
app.get('/api/rentals/:plate_number', (req, res) => {
  const plateNumber = req.params.plate_number;

  // Execute a SQL query to fetch rental information for a specific plate_number
  const sql = `
    SELECT *
    FROM rentals
    WHERE plate_number = ?;
  `;

  console.log("platenumber : " +plateNumber);

  pool.query(sql, [plateNumber], (error, results) => {
    if (error) {
      console.error('Error fetching rental information:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
       if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).json({ error: 'Rental information not found' });
      }
    }
    console.log('SQL Statement:', res.sql);
  });
});

app.get('/rentals/all', (req, res) => {
  // Execute a SQL query to fetch all rental information
  const sql = 'SELECT * FROM rentals';

  pool.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching rental information:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});



app.put('/api/update-rental/:rentalId', (req, res) => {
  const rentalId = req.params.rentalId;
  const updatedRental = req.body;

  if (updatedRental.rental_start_date) {
    updatedRental.rental_start_date = new Date(updatedRental.rental_start_date).toISOString().split('T')[0];
  }

  if (updatedRental.rental_end_date) {
    updatedRental.rental_end_date = new Date(updatedRental.rental_end_date).toISOString().split('T')[0];
  }
  
  // Ensure rental ID is provided
  if (!rentalId) {
    return res.status(400).json({ error: 'Rental ID is required' });
  }

  try {
    // Update rental information in the database
    pool.query(
      'UPDATE rentals SET ? WHERE rental_id = ?',
      [updatedRental, rentalId],
      (error, results) => {
        if (error) {
          console.error('Error updating rental:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Check if the rental was found and updated
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Rental not found' });
        }

        // Send success response
        res.json({ message: 'Rental updated successfully' });
      }
    );
  } catch (error) {
    console.error('Error updating rental:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/add-rental', (req, res) => {
    const newRental = req.body;

    // Insert new rental into the database

    pool.query('INSERT INTO rentals SET ?', newRental, (error, results) => {
        if (error) {
            console.error('Error inserting rental record: ' + error.stack);
            res.status(500).send('Error inserting rental record');
        } else {
            console.log('Inserted new rental record with ID: ' + results.insertId);
            res.status(201).send('New rental record added');
        }
    });
});


app.get('/api/generate-contract/:rentalId', async (req, res) => {
  const rentalId = req.params.rentalId;

  try {
    // Create a MySQL connection pool
    console.log(rentalId)

    // Fetch contract details from the database

    const sql = `
    SELECT
      rentals.rental_id,
      rentals.driver_id,
      rentals.rental_mode,
      rentals.rental_rate,
      rentals.rental_period,
      rentals.deposit,
      rentals.rental_start_date,
      rentals.rental_end_date,
      rentals.amount_received,
      vehicles.plate_number,
      vehicles.vehicle_type,
      vehicles.vehicle_name,
      vehicles.price,
      vehicles.purchase_date,
      vehicles.vehicle_condition,
      customers.id_card_number,
      customers.name,
      customers.gender,
      customers.birth_date,
      customers.address,
      customers.phone
    FROM
      rentals
    JOIN vehicles ON rentals.plate_number = vehicles.plate_number
    JOIN customers ON rentals.id_card_number = customers.id_card_number
    WHERE
      rentals.rental_id = ?
    `;

    pool.query(sql, [rentalId], (err, result) => {
      if (err) {
          console.error('Error query rental information in MySQL database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json(result[0]);
      }
   });

  } catch (error) {
    console.error('Error fetching contract details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
/******************************************************************************* */
//customer

//show all customer
app.get('/users/query', (req, res) => {
  const { username } = req.query;

  // Validation (you might want to add more validation)
  if (!username) {
      return res.status(400).json({ error: 'Username is required for querying user information.' });
  }

  // Search for users in the MySQL database based on username using the connection pool
  const queryUser = 'SELECT * FROM users WHERE username = ?';
  pool.query(queryUser, [username], (err, result) => {
      if (err) {
          console.error('Error querying user in MySQL database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          if (result.length === 0) {
              res.status(404).json({ error: 'User not found.' });
          } else {
              res.json(result[0]); // Assuming username is unique, return the first result
          }
      }
  });
});

//getcustomer by id card
app.get('/api/customers/query', (req, res) => {
  const { id_card_number } = req.query;

  // Validation (you might want to add more validation)
  if (!id_card_number) {
      return res.status(400).json({ error: 'ID card number is required for querying customer information.' });
  }

  // Search for customers in the MySQL database based on ID card number using the connection pool
  const queryCustomer = 'SELECT * FROM customers WHERE id_card_number = ?';
  pool.query(queryCustomer, [id_card_number], (err, result) => {
      if (err) {
          console.error('Error querying customer in MySQL database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          if (result.length === 0) {
              res.status(404).json({ error: 'Customer not found.' });
          } else {
              res.json(result[0]); // Assuming ID card number is unique, return the first result
          }
      }
  });
});

app.get('/api/customers/all', (req, res) => {
  // Retrieve all customers from the MySQL database using the connection pool
  const queryAllCustomers = 'SELECT * FROM customers';

  pool.query(queryAllCustomers, (err, result) => {
      if (err) {
          console.error('Error querying all customers in MySQL database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json(result);
      }
  });
});





/******************************************************************************* */


app.get('/users/query', (req, res) => {
  const { username } = req.query;

  // Validation (you might want to add more validation)
  if (!username) {
      return res.status(400).json({ error: 'Username is required for querying user information.' });
  }

  // Search for users in the MySQL database based on username using the connection pool
  const queryUser = 'SELECT * FROM users WHERE username = ?';
  pool.query(queryUser, [username], (err, result) => {
      if (err) {
          console.error('Error querying user in MySQL database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          if (result.length === 0) {
              res.status(404).json({ error: 'User not found.' });
          } else {
              res.json(result[0]); // Assuming username is unique, return the first result
          }
      }
  });
});



app.put('/api/users/update/:user_id', (req, res) => {
  const userId = parseInt(req.params.user_id);
  const { username, password, user_type } = req.body;

  // Validation (you might want to add more validation)
  if (!username && !password && !user_type) {
      return res.status(400).json({ error: 'At least one field (username, password, user_type) is required for updating.' });
  }

  // Search for the user in the MySQL database based on user ID using the connection pool
  const getUserQuery = 'SELECT * FROM users WHERE user_id = ?';
  pool.query(getUserQuery, [userId], (err, result) => {
      if (err) {
          console.error('Error searching for user in MySQL database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          if (result.length === 0) {
              res.status(404).json({ error: 'User not found.' });
          } else {
              // Update the user information in the MySQL database using the connection pool
              const updateQuery = 'UPDATE users SET username = ?, password = ?, user_type = ? WHERE user_id = ?';
              pool.query(updateQuery, [username || result[0].username, password || result[0].password, user_type || result[0].user_type, userId], (updateErr) => {
                  if (updateErr) {
                      console.error('Error updating user in MySQL database:', updateErr);
                      res.status(500).json({ error: 'Internal Server Error' });
                  } else {
                      res.json({ message: 'User updated successfully.' });
                  }
              });
          }
      }
  });
});


//get all
app.get('/api/users/all', (req, res) => {
  // Retrieve all users from the MySQL database using the connection pool
  const queryAllUsers = 'SELECT * FROM users';

  pool.query(queryAllUsers, (err, result) => {
      if (err) {
          console.error('Error querying all users in MySQL database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json(result);
      }
  });
});


app.put('/api/users/add', (req, res) => {
  const { username, password, user_type } = req.body;
  
  console.log(username)
  // Validation (you might want to add more validation)
  if (!username || !password) {
      return res.status(400).json({ error: 'Username, password, and user type are required for adding a new user.' });
  }

  // Insert the new user into the MySQL database using the connection pool
  const addUserQuery = 'INSERT INTO users (username, password, user_type) VALUES (?, ?, ?)';

  const values = [username, password, user_type];

  pool.query(addUserQuery, values, (err, result) => {
      if (err) {
          console.error('Error adding a new user to the MySQL database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json({ message: 'New user added successfully.' });
      }
  });
});



/*********************************************************************** */
//driver

// Get all drivers API endpoint
app.get('/api/drivers/all', (req, res) => {
  // Retrieve all drivers from the MySQL database using the connection pool
  const queryAllDrivers = 'SELECT * FROM drivers';

  pool.query(queryAllDrivers, (err, result) => {
      if (err) {
          console.error('Error querying all drivers in MySQL database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json(result);
      }
  });
});

app.put('/api/drivers/update/:id_card_number', (req, res) => {
    const { id_card_number } = req.params;
    const updatedDriver = req.body;

    const queryUpdateDriver = 'UPDATE drivers SET ? WHERE id_card_number = ?';

    const formattedBirthdate = new Date(updatedDriver.birth_date).toISOString().split('T')[0];

    updatedDriver.birth_date = formattedBirthdate;
    pool.query(queryUpdateDriver, [updatedDriver, id_card_number], (err, result) => {
        if (err) {
            console.error('Error updating driver in MySQL database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.affectedRows > 0) {
                res.json({ message: 'Driver updated successfully' });
            } else {
                res.status(404).json({ error: 'Driver not found' });
            }
        }
    });
});

app.put('/api/return-vehicle/:plate_number', (req, res) => {
    const { plate_number } = req.params;
    const queryGetRentals = 'SELECT * FROM rentals WHERE plate_number = ?';
    const queryGetMaxRentalId = 'SELECT MAX(rental_id) AS max_rental_id FROM rentals WHERE plate_number = ?';
    const queryUpdateAmountReceived =
        'UPDATE rentals SET amount_received = rental_period * rental_rate WHERE rental_id = ?';

    pool.query(queryGetRentals, [plate_number], (err, result) => {
        if (err) {
            console.error('Error querying rentals by plate_number in MySQL database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: 'No rentals found for the given plate_number' });
            return;
        }

        const rentalData = result;

        pool.query(queryGetMaxRentalId, [plate_number], (maxRentalIdErr, maxRentalIdResult) => {
            if (maxRentalIdErr) {
                console.error('Error getting max rental_id in MySQL database:', maxRentalIdErr);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            const maxRentalId = maxRentalIdResult[0].max_rental_id;

            if (maxRentalId) {
                pool.query(queryUpdateAmountReceived, [maxRentalId], (updateErr, updateResult) => {
                    if (updateErr) {
                        console.error('Error updating amount_received in MySQL database:', updateErr);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        res.json({ message: 'Records and amount_received updated successfully', rentalData });
                    }
                });
            } else {
                res.status(404).json({ error: 'No rentals found for the given plate_number' });
            }
        });
    });
});
//api end


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
