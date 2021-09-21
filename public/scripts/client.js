/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  //Initial loading of tweets
  //loadTweets();

  // Create Poll Event Handler
  $("#create-poll").on("click", () => {
    renderPollCreation();

    $('#poll').on('submit', (event) => {
      alert("Hello");
      event.preventDefault();

    })
  })


});

//User Ranking
// $("#poll").submit(event.preventDefault())

// //  Serialize Data
// const serializedData = $(this).serialize();

//   // Ajax POST request
//   $.ajax({
//     type: "POST",
//     url: "/pagecreation",
//     data: serializedData,
//     success: function () {
//       console.log("Success!")
//     }
//   })

//   event.preventDefault();

// });


// });

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
        <p class = "poll-title">${escape(pollTitle)}</p>
        <p>Rank the options from highest to lowest</p>
    `)

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


//**********************************RENDER FUNCTIONS***************************************
//*****************************************************************************************

//Render Poll Creation Page
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
