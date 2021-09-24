/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const db = require('../../database');
// import Sortable from 'sortablejs';
// var Chart = require('chart.js');


//*********************************PAGE HTML ELEMENTS***************************************
//******************************************************************************************

// // poll results functions

// //generates random hex colors for bar colors
// const generateHexColor = () => {
//   const randomColor = Math.floor(Math.random() * 16777215).toString(16);
//   return '#'.concat(randomColor);
// }

// const loadPollData = () => {
//   $.get('/api/results/:poll_id')
//     .then((response) => {
//       createPollResultsElement(response);
//     })
// }

// //assumes that the object being passed is the results from the getTitleAndPoints poll-query
// const createPollResultsElement = function (obj) { //takes in poll table
//   const $pollElement = $(`
//     <canvas id="pollResults" width="300px" height="auto" aria-label="Poll Results Chart" role="img"></canvas>
//   `);


//   // ajax get request that calls results.js -> /api/results/:poll_id
//   // ajax get request gets the obj to pass into this function

//   // get object -> title and sum of points
//   // [{ title: pizza, (sum of) points: 3}, {title: wings, points: 4}]

//   const labels = obj.map((el) => el.option);
//   const totalPoints = obj.map((el) => el.points);

//   // labels => obj.map((el) => el.title);
//   // total points -> obj.map((el) => el.points)

//   // generate hex colors to put in array for length of object
//   const barChartColors = [];
//   for (const i = 0; i < Object.keys(obj).length; i++) {
//     barChartColors.push(generateHexColor());
//   }

//   // variables to use chart object
//   const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Points gained by Borda Count',
//         backgroundColor: barChartColors,
//         data: totalPoints
//       }
//     ]
//   }

//   const options = {
//     title: {
//       display: true,
//       text: 'Poll Results',
//       fontSize: 20
//     },
//     elements: {
//       arc: {
//         borderWidth: 0
//       }
//     },
//     scales: {
//       yAxes: [{
//         ticks: {
//           min: 0,
//         },
//         scaleLabel: {
//           display: true,
//         }
//       }]
//     },
//     indexAxis: 'y'
//   }

//   new Chart($('#pollResults'), {
//     type: 'bar',
//     data,
//     options
//   })

//   return $pollElement;
// }

//**********************************RENDER FUNCTIONS***************************************
//*****************************************************************************************


// //Render Poll Results Page
// const renderPollResults = function (obj) {
//   const $contentContainer = $('#main-content');
//   $contentContainer.empty();

//   const element = createPollResultsElement(obj);
//   $('.container').append(element)
// }


// //Render Poll User Ranking Page
// const renderUserRanking = function (obj) {
//   let element = createUserRankingElement(obj1, obj2);
//   $('.container').append(element)
//   const el = document.getElementById('poll-answer');
//   new Sortable(el, {
//     animation: 150,
//     ghostClass: 'blue-background-class'
//   });

// }




// //**********************************LOAD FUNCTIONS******************************************
// //******************************************************************************************

// //Load Poll Results Function
// const loadPollResults = function () {
//   $.ajax('/results/:link', { method: 'GET' })
//     .done(function (obj) {
//       $('.container').empty()
//       renderPollResults(obj);
//     });
// }

// //Load User Ranking Function
// const loadUserRanking = function () {
//   $.ajax('/poll/:link', { method: 'GET' })
//     .done(function (obj) {
//       $('.container').empty()
//       renderUserRanking(obj);
//     });
// }

//******************************************************************************************
//******************************************************************************************

//Escape function (Security)
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
