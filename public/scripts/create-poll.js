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

`

// Each poll has a minimum of 2 options by default
let number_of_options = 2;

//Creates and displays new HTML element to store new options
const addOption = function () {
  //Increases the counter for the total number of options
  number_of_options++;

  //Creates new HTML input element
  let newOption = document.createElement("input");

  //Sets the attributes of the newly created element
  newOption.setAttribute("type", "text")
  newOption.setAttribute("class", "option")
  //dynamically seys ID according to refreshed total number of options
  newOption.setAttribute("name", `option-${number_of_options}`)
  newOption.setAttribute("placeholder", "Enter an option")


  //Appends new option creation slot to poll creation interface
  $("#poll-options").append(newOption);

}

//Creates links for each poll
const createLinks = function () {

  //Creates random 6 character string to use as URL like bit.ly
  const link = new Array(6).join().replace(/(.|$)/g, function () { return ((Math.random() * 36) | 0).toString(36)[Math.random() < .5 ? "toString" : "toUpperCase"]() })

  const linksFormElements = `
    <input type="hidden" id = 'link' name="link" value = '${link}' >
  `
  //adds links to poll to form so they can be stored upon submission
  $("#links").replaceWith(linksFormElements);
}

const onPollSubmit = function () {

  $('#poll').on('submit', (event) => {

    createLinks();
    // $(document).on("submit", "#poll", (event) => {
    const serializedData = $('#poll').serialize();
    console.log(serializedData);

    //Render Poll links invalidates the button
    // renderPollLinks(1);

    //stops page from refreshing on poll submission
    event.preventDefault();
  })
}

//Creates poll from home page and handles submissions events
$(document).ready(function () {

  // Create Poll Event Handlers
  $("#create-poll").on("click", () => {

    //Renders poll creation UI
    $('.container').replaceWith(poll_creation)

    //Adds new option to poll creation interface when "Add another option button is clicked"
    $("#add-option").on("click", () => addOption());

    //Upon poll submission
    onPollSubmit();
  })

})
