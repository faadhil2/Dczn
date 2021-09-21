/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  //Create Poll Handler
  $("#create-poll").on('submit', function (event) {
    //  Serialize Data
    const serializedData = $(this).serialize();

    // Ajax GET request
    $.ajax({
      type: "GET",
      url: "/pagecreation",
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
      url: "/pagecreation",
      data: serializedData,
    }).done(function () {
      //DO ACTION
    });

    event.preventDefault();
  });


});

//*********************************PAGE HTML ELEMENTS***************************************
//******************************************************************************************

//Create User Ranking Page Element
const createUserRankingElement = function (obj1, obj2) { //Params: obj1 = poll, obj2 = poll_options
const pollTitle = obj1.title;
const pollOptions = [];

for (let key in obj2){
  pollOptions.push(obj2[key].title)
}

   const userRanking = (`
   <article class= "user-ranking">
      <form action = "POST"
        <p class = "poll-title">${escape(pollTitle)}</p>
        <p>Rank the options from highest to lowest</p>
    `);

    for (let element of pollOptions){
      userRanking += `<div class = "poll-answer">${escape(element)}</div>`;
    }

    userRanking += `</article>`;

    return userRanking;
  }


//**********************************RENDER FUNCTIONS***************************************
//*****************************************************************************************

//Render Poll Creation Page
const renderPollCreation = function (obj) {
  let element = createPollCreationElement(obj);
    $('.container').append(element)
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
}


//**********************************LOAD FUNCTIONS******************************************
//******************************************************************************************


//Load Poll Creation Form Function
const loadPollCreation = function () {
  $.ajax('/pollcreation', { method: 'GET' })
    .done(function (obj) {
      $('.container').empty()
      renderPollCreation(obj);
    });
}

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
