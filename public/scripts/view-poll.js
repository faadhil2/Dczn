
//hardcoded
const poll_1 = {
  title: "What should we play next?"
}

const poll_1_options = {
  1: {
    title: 'basketball'
  },

  2: {
    title: 'soccer'
  },

  3: {
    title: 'football'
  },

  4: {
    title: 'ping pong'
  },

  5: {
    title: 'tennis'
  }
}


//Create User Ranking Page Element
const createUserRankingElement = function (obj1, obj2) { //Params: obj1 = poll, obj2 = poll_options
  const pollTitle = obj1.title;
  const pollOptions = [];

  for (let key in obj2) {
    pollOptions.push(obj2[key].title)
  }

  let userRanking = (`
  <main class="container" id='main-content'>
    <article class= "user-ranking">
        <form id = "ranking" action = "/userRanking" method = "POST">
          <p class = "poll-title">${escape(pollTitle)}</p>
          <p class = 'poll-tooltip'>Drag and drop to rank your preferences</p>
          <div id = "poll-answer">
    `);


  for (let element of pollOptions) {
    userRanking += `<div class = "poll-option">${escape(element)}</div>`;
  }


  userRanking += `
  </div>
  <button type="button" class="btn btn-primary" id = "submit-choices">Submit choices</button>
  </form>
  </article>
  <main>
  `
  return userRanking;
}



$(document).ready(function () {

  // Create Poll Event Handlers
  $("#view-poll").on("click", () => {

    $('.container').replaceWith(createUserRankingElement(poll_1, poll_1_options));

    const el = document.getElementById('poll-answer');
    new Sortable(el, {
      animation: 150,
      ghostClass: 'blue-background-class'
    });

    // Create Poll Event Handlers
    $("#submit-chocies").on("click", () => {

      //Renders poll creation UI
      $('.container').replaceWith(`<h1>Thank you!</h1>`)

    })
    //Upon choice submission
    // onChoiceSubmit();
  })

})
