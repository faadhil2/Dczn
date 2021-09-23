const db = require('../database');

const addPoll = function (poll) {
  const poll_id = getPollID() + 1;

  const queryString = `
    INSERT INTO polls (id, email, title, description, link, name_req)
    VALUES ($1, $2, $3, 4$, 5$, $6)
    RETURNING *;
  `
  return db.query(queryString, [poll_id, poll.email, poll.title, poll.description, poll.link, poll.name_req])
    .then(result =>
      result.rows[0] ?
        result.rows[0] :
        null
    )
    .catch((err) => {
      console.log(err.message);
    });
}

exports.addUser = addPoll;

const getPollID = function () {
  const queryString = `
    SELECT COUNT(*)
    FROM polls
    RETURNING *;
  `
  return db.query(queryString, [link])
    .then(result =>
      result.rows[0] ?
        result.rows[0] :
        null
    )
    .catch((err) => {
      console.log(err.message);
    });
}

exports.addUser = getPollID;

const getPollOptionID = function () {
  const queryString = `
    SELECT COUNT(*)
    FROM poll_options
    RETURNING *;
  `
  return db.query(queryString, [link])
    .then(result =>
      result.rows[0] ?
        result.rows[0] :
        null
    )
    .catch((err) => {
      console.log(err.message);
    });
}

exports.addUser = getPollOptionID;


const addPollOption = function (option) {

  const poll_id = getPollID();
  const poll_option_id = getPollOptionID() + 1;

  const queryString = `
    INSERT INTO poll_options (id, poll_id, title, description, points)
    VALUES ($1, $2, $3, 4$)
    RETURNING *;
  `
  return db.query(queryString, [poll_option_id, poll_id, option.title, option.description])
    .then(result =>
      result.rows[0] ?
        result.rows[0] :
        null
    )
    .catch((err) => {
      console.log(err.message);
    });
}

exports.addUser = addPollOption;

const addPollOPtions = function (poll) {
  for (key of Object.keys(poll)) {
    addPollOPtion(poll[key])
  }
}
