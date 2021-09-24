const format = require('pg-format');
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');

const db = new Pool(dbParams);
// const db = new Pool({
//   user: 'labber',
//   password: 'labber',
//   host: 'localhost',
//   database: 'midterm'
// });
//db.connect();




// Get the poll using the user_link
// @Params:
// userLink = the user_link in the poll table.

const getPollWithUserLink = function(userLink) {
  return db.query(`SELECT polls.title as poll_title, polls.description as poll_description, polls.name_req ,poll_options.*
    FROM poll_options
    JOIN polls on polls.id = poll_id
    WHERE polls.link = $1`, [userLink])
    .then((result) => {
      // const pollobj = result.rows;
      // addVote(pollobj,[1,2,3,4,5], 'Johnny');
      return (result.rows)
      db.end()
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
  let queryTemp = [];

  if (poll[0].name_req === true){
    queryString = `
    INSERT INTO user_answers (name, poll_option_id, points) VALUES %L
    RETURNING *`
    for(let x = 0; x < rankArray.length; x++){

      queryTemp.push(voterName);
      queryTemp.push(x+1);
      queryTemp.push(rankArray.length - rankArray[x]);
      queryParams.push(queryTemp)
      queryTemp = [];
    }
  } else {
    queryString = `
    INSERT INTO user_answers (poll_option_id, points) VALUES %L
    RETURNING *`
    for(let x = 0; x < rankArray.length; x++){

      queryTemp.push(x+1);
      queryTemp.push(rankArray.length - rankArray[x]);
      queryParams.push(queryTemp)
      queryTemp = [];
    }
  }

  return db
  .query(format(queryString, queryParams))
    .then((result) => {
      console.log(result.rows);
      return result.rows
      db.end()
  })
    .catch((err) => {
      console.log(err.message)
      return null;
    });
}
exports.addVote = addVote;

// TESTING **************************
// getPollWithUserLink('hy75f6');

