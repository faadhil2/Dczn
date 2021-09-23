const db = require
('../database');


const getPoints = () => {
  return db.query('SELECT points FROM poll_options ORDER BY points DESC;')
  .then((response) => {
    return response.rows;
  });
};

const getTitleAndPoints = (poll_id) => {
  return db.query(`SELECT title, SUM(user_answers.ranking) AS points
  FROM user_answers
  JOIN poll ON poll_id = poll.id
  WHERE poll_id = ${poll_id}
  GROUP BY points
  ORDER BY points;
  `)
  .then((response) => response.rows);
}
// -> returns: array of titles and points of the title (value) || [{ title: pizza, (sum of) points: 3}, {title: wings, points: 4}]

module.exports = { getPoints, getTitleAndPoints };
