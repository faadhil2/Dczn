/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/poll-queries');

const resultsRouter = (db) => {

  router.get('/', (req, res) => {
    db.query()
  })
};

module.exports = (db) => {
  router.get("/:poll_id", (req, res) => {
   const pollID = req.params.poll_id
   res.json(db.getTitleAndPoints(pollID));
  });

  return router;
};
