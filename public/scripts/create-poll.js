//Creates poll creation HTML element
const poll_creation_HTML = `
<main class="container" id='main-content'>
  <section id = 'poll-creator'>
      <form id = 'poll'>
        <input type="text" id = 'form-title' class = 'option' name="title" placeholder="Enter your poll's title">
        <textarea name="description" rows="3" placeholder="Enter a description (optional)"></textarea>
        <section id = 'poll-options'>
          <input type="text" class = option name="option-1" placeholder="Enter an option">
          <input type="text" class = description name="description-1" placeholder="Enter a description for option 1 (optional)">
          <input type="text" class = option name="option-2" placeholder="Enter an option">
          <input type="text" class = description name="description-2" placeholder="Enter a description for option 2 (optional)">
          </section>
          <section id = 'links'>
            <input type="hidden" id = 'link' name="link">
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
  </main>
`

// Each poll has a minimum of 2 options by default
let number_of_options = 2;

//Creates and displays new HTML element to store new options
const addOption = function () {
  //Increases the counter for the total number of options
  number_of_options++;

  //Creates new HTML input element
  let newOption = document.createElement("input");
  let newDescription = document.createElement("input");

  //Sets the attributes of the newly created element
  newOption.setAttribute("type", "text")
  newOption.setAttribute("class", "option")
  //dynamically seys ID according to refreshed total number of options
  newOption.setAttribute("name", `option-${number_of_options}`)
  newOption.setAttribute("placeholder", "Enter an option")

  newDescription.setAttribute("type", "text")
  newDescription.setAttribute("class", "description")
  //dynamically seys ID according to refreshed total number of options
  newDescription.setAttribute("name", `description-${number_of_options}`)
  newDescription.setAttribute("placeholder", `Enter a description for option ${number_of_options}`)


  //Appends new option creation slot to poll creation interface
  $("#poll-options").append(newOption);
  $("#poll-options").append(newDescription);

}

//Creates links for each poll
const createLinks = function () {

  //Creates random 6 character string to use as URL like bit.ly
  const link = new Array(6).join().replace(/(.|$)/g, function () { return ((Math.random() * 36) | 0).toString(36)[Math.random() < .5 ? "toString" : "toUpperCase"]() })

  const linksFormElements = `
    <input type="hidden" id = 'link' name="link" value = '${link}' >
  `
  const linksDisplayElements = `
  <section id = "links">
    <section id = admin-links>
      <p> View your results: </p>
      <a id="admin-link" class = "link" href="/results/${link}"> /results/${link} </a>
    </section>
    <section id = share-links>
      <p> Share your poll: </p>
      <a id="share-link" class = "link" href = "/choose/${link}"> /choose/${link} </a>
    <section>
  </section>
  `

  //adds links to poll to form so they can be stored upon submission
  $("#links").replaceWith(linksFormElements);

  return linksDisplayElements
}


//sends emails with links upon poll creation
const sendLinksByEmail = function () {

  //Provides content for emails
  const data = {
    from: 'DCZN Team <info@dczn.ca>',
    to: poll.email,
    subject: 'Your poll is ready to share!',
    html: `
    Here are your links!

    View your results: <a href="/results/${poll.link}"> /results/${poll.link}  </a>

    Share your poll: <a href = "/choose/${poll.link}"> /choose/${poll.link} </a>

    Good luck making the right DCZN ;)
    `
  };

  //Sends email and console logs it
  mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.log("got an error: ", error);
    } else {
      console.log(body);
    }
  });

}

//Adds poll elements do database

const onPollSubmit = function () {

  $('#poll').on('submit', (event) => {
    //stops page from refreshing on poll submission
    event.preventDefault();

    //creates admin and user links
    const displayLinks = createLinks();

    //stores poll data in an object
    const poll_raw_data = $('#poll').serializeArray();

    //converts poll results object to more readable format
    const poll = {}
    const options = {}
    for (key in poll_raw_data) {
      poll[poll_raw_data[key].name] = poll_raw_data[key].value;
    }
    for (key in poll) {
      if (key.includes('option')) {
        let option_number = key[key.length - 1]
        options[option_number] = {
          'title': poll[key],
          'description': poll[`description-${option_number}`]
        }
      }
    }


    console.log(poll);
    console.log(options);

    //adds poll elements to db

    //uses mailgun API to send links to poll creator's email
    // sendLinksByEmail();

    //renders HTML to display links after poll submission
    $('.container').replaceWith(displayLinks);


  })
}



//Creates poll from home page and handles submissions events
$(document).ready(function () {

  // Create Poll Event Handlers
  $("#create-poll").on("click", () => {

    //Renders poll creation UI
    $('.container').replaceWith(poll_creation_HTML)

    //Adds new option to poll creation interface when "Add another option button is clicked"
    $("#add-option").on("click", () => addOption());

    //Upon poll submission
    onPollSubmit();
  })

})
