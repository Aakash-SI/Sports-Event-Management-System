const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'Sportz@2023',
    host: 'localhost',
    port: 5432,
    database: 'login_system'
})

const hrVenuePool = new Pool({
    user: 'postgres',
    password: 'Sportz@2023',
    host: 'localhost',
    port: 5432,
    database: 'HR', // Change this to your desired database name
  });
  
  module.exports = { pool, hrVenuePool };


