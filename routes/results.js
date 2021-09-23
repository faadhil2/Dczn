/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/poll-queries');


module.exports = (db) => {
  router.get("/:poll_link", (req, res) => {
   const pollLink = req.params.link
   res.json(db.getTitleAndPoints(pollLink));
  });

  return router;
};
