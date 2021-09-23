// module.exports = function() {

  const { Pool } = require('pg');
  const dbParams = require('./lib/db.js');

  // Commenting out SQL database for now...
  const pool = new Pool(dbParams);
  pool.connect();

const getPollWithUserLink = function(userLink) {
  return pool
    .query(`SELECT *
    FROM poll_options
    JOIN poll on poll.id = poll_id
    WHERE poll.user_link = $1`, [userLink])
    .then((result) => {
      console.log(result.rows[0])
       return(result.rows[0])
    })
    .catch((err) => {
      return null;
    });
}
return getPollWithUserLink;

// }
