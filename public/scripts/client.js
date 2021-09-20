/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  //Initial loading of tweets
  loadTweets();

  //Form Submit Handler
  $("#target").on('submit', function (event) {
    if ($('.counter').val() < 0) {
      event.preventDefault();
      $('#emptyTweet').slideUp("slow", function () { $('#emptyTweet').addClass('hidden') });
      return $('#charLimit').slideDown("slow", function () { $('#charLimit').removeClass('hidden') });

    } if ($('.counter').val() > 139) {
      event.preventDefault();
      $('#charLimit').slideUp("slow", function () { $('#charLimit').addClass('hidden') });
      return $('#emptyTweet').slideDown("slow", function () { $('#emptyTweet').removeClass('hidden') });
    }

    //  Serialize Data
    const serializedData = $(this).serialize();

    $('#charLimit').slideUp("slow", function () { $('#charLimit').addClass('hidden') });
    $('#emptyTweet').slideUp("slow", function () { $('#emptyTweet').addClass('hidden') });

    // Ajax POST request
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: serializedData,
    }).done(function () {
      loadTweets()
      $('#tweet-text').val('')
      $('.counter').val(140)
    });

    event.preventDefault();
  });

});

//Create the tweet element
const createTweetElement = function (tweetObj) {
  let tweetArticle = [];
  for (tweet in tweetObj) {
    tweetArticle.unshift(`
    <article class= "tweet">
    <article>
    <header>
    <div>
    <img src = ${escape(tweetObj[tweet].user.avatars)} alt = ${escape(tweetObj[tweet].user.name)}>
    <p><strong>${escape(tweetObj[tweet].user.name)}</strong></p>
    </div>
    <p>${escape(tweetObj[tweet].user.handle)}</p>
    </header>
    <main>${escape(tweetObj[tweet].content.text)}</main>
    <footer>
    <p>${escape(timeago.format(tweetObj[tweet].created_at))}</p>
    <div class = "bottom-icons">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </div>
    </footer>
    </article>
    </article>
    `)
  }
  return tweetArticle;
}

//Render tweets
const renderTweets = function (tweet) {
  let tweetArray = createTweetElement(tweet);
  for (let element of tweetArray) {
    console.log(element)
    $('#tweet-container').append(element)
  }
}

//Load Tweet Function
const loadTweets = function () {
  $.ajax('/tweets', { method: 'GET' })
    .done(function (tweets) {
      $('#tweet-container').empty()
      renderTweets(tweets);
      console.log(tweets)
    });
}

//Escape function (Security)
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
