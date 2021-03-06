const database = require('./database');

// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const morgan = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');

// Commenting out SQL database for now...
const db = new Pool(dbParams);
db.connect();

// const db = require('./db/mock_database')


//Sets up email sending via Mailgun JS Api
const api_key = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const domain = 'www.mydomain.com';
// const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain })

// db.users, db.polls, db.poll_options db.user_answers


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

const userRankingRoutes = require("./routes/userRanking");

// const pollsRoutes = require("./routes/polls");
const resultsRouter = require("./routes/results");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

app.use("/userranking", userRankingRoutes(db));


// app.use("/api/polls", pollsRoutes(db));
app.use("/api/results", resultsRouter(db));



// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/results/:link", (req, res) => {
  res.render("results");
});

app.get("/poll/:link", (req, res) => {
  res.render("poll");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
