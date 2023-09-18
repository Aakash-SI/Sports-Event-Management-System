const express = require('express');
const cors = require('cors');
const  { pool, hrVenuePool } = require('./database');

const app = express();

app.use(express.json());
app.use(cors());

// Define the '/adduser' route for adding users
app.post("/adduser", async (req, res) => {

  const username = req.body["username"];
  const password = req.body["password"];

  console.log("Username: " + username);
  console.log("Password: " + password);

  const insert_statement = `INSERT INTO accounts (username, password) 
  VALUES ('${username}', '${password}');`; // Use single quotes here
  try {
    const response = await pool.query(insert_statement);
    console.log("Data Saved");
    console.log(response);
    res.json({ success: true }); // Send a success response as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "An error occurred" }); // Send an error response as JSON
  }
});

app.post('/add-venue', async (req, res) => {
  try {
    const venue = req.body["venue"];
    const sports_name = req.body["sports_name"];
    const status = req.body["status"];
    const time = req.body["time"];
    const slot = req.body["slot"];

    const insert_statement = `
      INSERT INTO hr_venue (venue, sports_name, status, "time", slot)
      VALUES ('${venue}', '${sports_name}', '${status}', '${time}', '${slot}');
    `;

    const response = await hrVenuePool.query(insert_statement);
    console.log("Data Saved in Venue table");
    console.log(response);
    res.json({ success: true }); // Send a success response as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "An error occurred" });
  }
});

app.post('/add-equipment', async (req, res) => {
  try {
    const sports_name = req.body["sports_name"];
    const equipment_name = req.body["equipment_name"];
    const quantity = req.body["quantity"];

    const insert_statement = `
      INSERT INTO hr_equipment (sports_name, equipment_name, quantity)
      VALUES ('${sports_name}', '${equipment_name}', '${quantity}');
    `;

    const response = await hrVenuePool.query(insert_statement);
    console.log("Data Saved in Equipments Table");
    console.log(response);
    res.json({ success: true }); // Send a success response as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "An error occurred" });
  }
});

app.get('/get-equipment', async (req, res) => {
  try {
    const equipment = await hrVenuePool.query('SELECT * FROM hr_equipment');
    res.json(equipment.rows);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define the '/get-venues' route for fetching venue data
app.get('/get-venues', async (req, res) => {
  try {
    const venues = await hrVenuePool.query('SELECT * FROM hr_venue');
    res.json(venues.rows);
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define the '/getusers' route for fetching users
app.get("/getusers", async (req, res) => {
  try {
    // Query the database to fetch user details
    const users = await pool.query("SELECT * FROM accounts"); // Assuming your table is named 'accounts'
    res.json(users.rows); // Send the data as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});



app.post('/add-approval', async (req, res) => {
  try {
    const emp_name = req.body["emp_name"];
    const location = req.body["location"];
    const time = req.body["time"];
    const equipment_name = req.body["equipment_name"];
    const quantity = req.body["quantity"];
    const status = req.body["status"];

    const insert_statement = `
      INSERT INTO hr_approval ( emp_name, location, "time", equipment_name, quantity, status)
      VALUES ('${emp_name}', '${location}', '${time}' ,'${equipment_name}','${quantity}','${status}');
    `;

    const response = await hrVenuePool.query(insert_statement);
    console.log("Data Saved in Approval Table");
    console.log(response);
    res.json({ success: true }); // Send a success response as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "An error occurred" });
  }
});

app.get("/get-approval", async (req, res) => {
  try {
    // Query the database to fetch user details
    const users = await hrVenuePool.query("SELECT * FROM hr_approval"); // Assuming your table is named 'accounts'
    res.json(users.rows); // Send the data as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(4000, () => console.log("Server on localhost:4000"));
