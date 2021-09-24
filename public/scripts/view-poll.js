
//hardcoded
const poll_1 = {
  title: "Sports"
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
    title: 'pingpong'
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
      <form id = "ranking" class = 'poll-form' action = "/userRanking" method = "POST">
      <p class = "poll-title">${escape(pollTitle)}</p>
      <p class = poll-tooltip>Drag your favorite choices to the top!</p>
        <div id = "poll-answer">
    `);


  for (let element of pollOptions) {
    userRanking += `<div class = "poll-option">${escape(element)}</div>`;
  }


  userRanking += `
  </div>
  <button type="button" class="btn btn-primary">Submit</button>
  </form>
  </article>
  </main>
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

    //Upon choice submission
    // onChoiceSubmit();
  })

})
