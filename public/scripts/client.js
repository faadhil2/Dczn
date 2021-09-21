/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// import Sortable from 'sortablejs';
// var Chart = require('chart.js');


$(document).ready(function () {
console.log("ready")
  //Create Poll Handler
  $("#create-poll").on('click', function (event) {
    //  Serialize Data
    const serializedData = $(this).serialize();

    // Ajax GET request
    $.ajax({
      type: "GET",
      url: "/pollcreation",
      data: serializedData,
    }).done(function () {
      loadPollCreation()
    });

    event.preventDefault();
  });



  //User Ranking
  $("#poll").on('submit', function (event) {
    //  Serialize Data
    const serializedData = $(this).serialize();

    // Ajax POST request
    $.ajax({
      type: "POST",
      url: "/pollcreation",
      data: serializedData,
    }).done(function () {
      //DO ACTION
    });

    event.preventDefault();
  });

  // load poll results -> get to results through admin link or submit poll button
  $("#poll").on('submit', function (event) {
    //  Serialize Data
    const serializedData = $(this).serialize();

    // Ajax GET request
    $.ajax({
      type: "GET",
      url: "/pollcreation",
      data: serializedData,
    }).done(function () {
      loadPollResults()
    });

    event.preventDefault();
  });

  //Initial loading of tweets
  //loadTweets();



  // Create Poll Event Handlers
  $("#create-poll").on("click", () => {

    //Renders poll creation UI
    renderPollCreation();

    //Then redirects upon poll submission
    $('#poll').on('submit', (event) => {
      const serializedData = $('#poll').serialize();

      // Ajax POST request
      $.ajax({
        type: "POST",
        url: "/pollresults",
        data: serializedData,
        success: () => console.log("Success!")
      })
      //stops page from refreshing on poll submission
      event.preventDefault();
    })
  })

})

//*********************************PAGE HTML ELEMENTS***************************************
//******************************************************************************************

//Create User Ranking Page Element
const createUserRankingElement = function (obj1, obj2) { //Params: obj1 = poll, obj2 = poll_options
  const pollTitle = obj1.title;
  const pollOptions = [];

  for (let key in obj2) {
    pollOptions.push(obj2[key].title)
  }

  const userRanking = (`
   <article class= "user-ranking">
      <form id = "ranking action = "/userRanking" method = "POST">
        <p class = "poll-title">${escape(pollTitle)}</p>
        <p>Rank the options from highest to lowest</p>
        <div id = "poll-answer">
    `);


    for (let element of pollOptions){
      userRanking += `<div class = "poll-option">${escape(element)}</div>`;
    }


  userRanking += `
  </div>
  <button type="button" class="btn btn-primary">Submit</button>
  </form>
  </article>
  `

  for (let element of pollOptions) {
    userRanking += `<div class = "poll-answer">${escape(element)}</div>`
  }
  userRanking += `</article>`


  return userRanking;
}




//Creates poll creation HTML element
const poll_creation = `
<section id = 'poll-creator'>
    <form id = 'poll'>
      <input type="text" id = 'form-title' class = 'option' name="form-title" placeholder="Enter your poll's title">
      <textarea name="description" rows="3" placeholder="Enter a description (optional)"></textarea>
      <section id = 'poll-options'>
        <input type="text" class = option name="option-1" placeholder="Enter an option">
        <input type="text" class = option name="option-2" placeholder="Enter an option">
      </section>
      <button id ='add-option' type = 'button'> Add another option </button>
      <section id = 'submission'>
          <section id = req-names>
              <p> Require names upon submission? </p>
              <section>
                  <input type="radio" name="req-names" value=True>
                  <label for="req-names-true">Yes</label>
                  <input type="radio" name="req-names" value=False>
                  <label for="req-names-false">No</label>
              </section>
          </section>
          <input type="text" class = option name="email" placeholder="Enter your email address">
          <button type="submit" id = submit-button> Submit Poll</button>
          <input type="reset" id = reset-button value = "Reset Poll">
      </section>
    </form>
  </section>

`


// poll results functions

//generates random hex colors for bar colors
const generateHexColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return '#'.concat(randomColor);
}

const createPollResultsElement = function(obj) { //takes in poll table
  const $pollElement = $(`
    <canvas id="pollResults" width="300px" height="auto"></canvas>
  `);

  const $links = $(`
    <section id = "links">
      <p id="admin-link" class = "link"> ${obj.admin_link} </p>
      <p id="share-link" class = "link"> ${obj.user_link} </p>
    </section>
  `);

  return $pollElement, $links;
}

//assumes that the object being passed is the poll_options table
const pollResultsHelpers = function (pollOptions) {

  // generate the labels for the data chart
  const labels = [];
  const totalPoints = [];

  // fill arrays with chart labels and values
  for (const entry in pollOptions) {
    labels.push(pollOptions.entry[title]);
    totalPoints.push(pollOptions.entry[points]);
  };

  // generate hex colors to put in array for length of object
  const barChartColors = [];
  for (const i = 0; i < Object.keys(pollOptions).length; i++) {
    barChartColors.push(generateHexColor);
  }

  // variables to use chart object
  const data = {
    labels,
    datasets: [
      {
        label: 'Points gained by Borda Count',
        backgroundColor: barChartColors,
        data: totalPoints
      }
    ]
  }


  const options = {
    title: {
      display: true,
      text: 'Poll Results',
      fontSize: 20
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
        },
        scaleLabel: {
          display: true,
        }
      }]
    },
    indexAxis: 'y'
  }

  new Chart($('#pollResults'), {
    type: 'bar',
    data,
    options
  })
}


//**********************************RENDER FUNCTIONS***************************************
//*****************************************************************************************

//Render Poll Creation Page

// const renderPollCreation = function (obj) {
//   let element = createPollCreationElement(obj);
//   $('.container').append(element)
// }

const renderPollCreation = function () {
  $('.container').replaceWith(poll_creation)

  //Adds new option to poll creation interface when "Add another option button is clicked"
  document.getElementById("add-option").addEventListener("click", () => addOption());
}


//Render Poll Results Page
const renderPollResults = function (obj) {
  let element = createPollResultsElement(obj);
  $('.container').append(element)
}


//Render Poll User Ranking Page
const renderUserRanking = function (obj) {
  let element = createUserRankingElement(obj1, obj2);
  $('.container').append(element)
  const el = document.getElementById('poll-answer');
  new Sortable(el, {
    animation: 150,
    ghostClass: 'blue-background-class'
});

}

// Each poll has a minimum of 2 options by default
let number_of_options = 2;

//Creates and displays new HTML element to store new options
function addOption() {
  //Increases the counter for the total number of options
  number_of_options++;

  //Creates new HTML input element
  let newOption = document.createElement("input");

  //Sets the attributes of the newly created element
  newOption.setAttribute("type", "text")
  newOption.setAttribute("class", "option")
  newOption.setAttribute("placeholder", "Enter an option")

  //dynamically seys ID according to refreshed total number of options
  newOption.setAttribute("id", `option-${number_of_options}`)

  //Appends new option creation slot to poll creation interface
  document.getElementById("poll-options").appendChild(newOption);

}


//**********************************LOAD FUNCTIONS******************************************
//******************************************************************************************

//Load Poll Results Function
const loadPollResults = function () {
  $.ajax('/pollresults', { method: 'GET' })
    .done(function (obj) {
      $('.container').empty()
      renderPollResults(obj);
    });
}

//Load User Ranking Function
const loadUserRanking = function () {
  $.ajax('/userranking', { method: 'GET' })
    .done(function (obj) {
      $('.container').empty()
      renderUserRanking(obj);
    });
}

//******************************************************************************************
//******************************************************************************************

//Escape function (Security)
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
