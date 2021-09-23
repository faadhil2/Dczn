const db = require('../database');

const getPollID = function () {
  const queryString = `
    SELECT COUNT(*)
    FROM polls
    RETURNING *;
  `
  return db.query(queryString)
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
  return db.query(queryString)
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

const addPoll = function (poll) {
  const poll_id = getPollID() + 1;

  const queryString = `
    INSERT INTO polls (id, email, title, description, link, name_req)
    VALUES ($1, $2, $3, $4, $5, $6)
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

const addPollOptions = function (options) {

  const poll_id = getPollID();

  for (option in options) {

    const poll_option_id = getPollOptionID() + 1;

    const queryString = `
    INSERT INTO poll_options (id, poll_id, title, description, points)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `
    return db.query(queryString, [poll_option_id, poll_id, option.title, option.description, '0'])
      .then(result =>
        result.rows[0] ?
          result.rows[0] :
          null
      )
      .catch((err) => {
        console.log(err.message);
      });

  }
}

exports.addUser = addPollOptions;

