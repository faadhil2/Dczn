const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});



// DB_HOST=localhost
// DB_USER=labber
// DB_PASS=labber
// DB_NAME=midterm
// # Uncomment and set to true for Heroku
// DB_SSL=true if heroku
// DB_PORT=5432
