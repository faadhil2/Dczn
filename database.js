const { Pool } = require('pg');
// const pool = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME
// });

// const pool = new Pool({
//   user: 'vagrant',
//   password: '123',
//   host: 'localhost',
//   database: 'dczn'
// });

const addUser = function (user) {
  const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `
  return pool
    .query(queryString, [user.name, user.email, user.password])
    .then(result =>
      result.rows[0] ?
        result.rows[0] :
        null
    )
    .catch((err) => {
      console.log(err.message);
    });
}
exports.addUser = addUser;

// DB_HOST=localhost
// DB_USER=labber
// DB_PASS=labber
// DB_NAME=midterm
// # Uncomment and set to true for Heroku
// DB_SSL=true if heroku
// DB_PORT=5432
