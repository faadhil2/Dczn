$(document).ready(function () {

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
            <input type="submit" id = submit-button value="Submit Poll">
            <input type="reset" id = reset-button value = "Reset Poll">
        </section>
      </form>
    </section>

  `

  // replaces main content with poll creation
  const createPoll = function () {
    $('#main-content').replaceWith(poll_creation)

    //Adds new option to poll creation interface when "Add another option button is clicked"
    document.getElementById("add-option").addEventListener("click", () => addOption());
  }

  //Initiates poll creation
  document.getElementById("create-poll").addEventListener("click", () => createPoll())

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




})






