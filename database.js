// const { Pool } = require('pg');
// const dbParams = require('./lib/db.js');

// const pool = new Pool(dbParams);
// pool.connect();

// Get the poll using the user_link
// @Params:
// userLink = the user_link in the poll table.

const getPollWithUserLink = function(userLink) {
  return db
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
exports.getPollWithUserLink = getPollWithUserLink;


// Adds the poll vote to user_answers.
// @Params:
// poll = object of the poll.
// rankArray = array of integers containing the rank of each poll option.
// voterName: name of the voter if the poll requires it.

const addVote =  function(poll, rankArray, voterName) {
  let queryString = '';
  const queryParams = [];

  for (let x = 0; x < rankArray; x++){

    if (poll.name_req === true){
    queryParams.push(voterName);

    queryString += `
    INSERT INTO user_answers (name, poll_option_id, rank)
    VALUES ($${queryParams.length},`

    queryParams.push(x);
    queryString += `$${queryParams.length},`

    queryParams.push(rankArray.length - rankArray[x]);
    queryString += `$${queryParams.length})
    RETURNING *`

    } else {

    queryParams.push(x);
    queryString += `
    INSERT INTO user_answers (poll_option_id, rank)
    VALUES ($${queryParams.length},`

    queryParams.push(rankArray.length - rankArray[x]);
    queryString += `$${queryParams.length})
    RETURNING *`
    }
  }

  return db
    .query(queryString, queryParams)
    .then((result) => {
       result.rows
  })
    .catch((err) => {
      return null;
    });
}
exports.addVote = addVote;

