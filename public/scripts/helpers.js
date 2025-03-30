const createTweetElement = function (tweetObj) {
  const timestamp = timeago.format(tweetObj.created_at - 11 * 1000 * 60 * 60); // returns in format like '11 hours ago'
  // the HTML to render 

  // The element which all else is appended
  const $tweet = $("<article>").addClass("tweet");

  // The header component of tweet
  const $header = $("<header>")
    .append(
      $("<div>").addClass("person-info")
        .append(
          $("<img>").attr("src", tweetObj.user.avatars),
          $("<strong>").text(tweetObj.user.name),
        ),
      ($("<small>").text(tweetObj.user.handle))
    );

  // The text component 
  const $textComponent = $("<p>").text(tweetObj.content.text);
  // The footer component

  const $footer = $("<footer>")
    .append($("<div>").addClass("post-date")
      .append(
        $("<small>").text(timestamp)),
      $("<div>").addClass("tweet-icons")
        .append(
          $("<i>").addClass("fa-solid fa-flag"),
          $("<i>").addClass("fa-solid fa-retweet"),
          $("<i>").addClass("fa-solid fa-heart")
        )
    );

  // Putting it all together
  $tweet.append($header, $textComponent, $footer);
  return $tweet;
};

const renderTweets = function (tweetArr) {
  for (const tweet of tweetArr) {
    const $tweet = createTweetElement(tweet);
    // prepend to put the newest tweets on top
    $('#tweets-container').prepend($tweet);
  }

};


// the error message for invalid tweets
const renderErrorMessage = function (message) {
  const $error = $("#tweet-error");

  // updating the content inside the div
  $error.html(`
    <i class="fa-solid fa-triangle-exclamation"></i>
    <span>${message}</span>
    <i class="fa-solid fa-triangle-exclamation"></i>
    `);
  // .no-error hides element by CSS. Removing it shows. 
  $error.removeClass("no-error").hide().slideDown();

  // let the error message persist 2s then slide out
  setTimeout(function() {
    $error.slideUp("slow", function() {
      //add the class again to hide with CSS
      $error.addClass("no-error");
    })
  }, 2000);

  return $error;
};


// fetching tweets from /tweets
const loadTweets = function () {

  const endpoint = "/api/tweets";

  // shorthand ajax function
  $.ajax({
    type: "GET",
    url: endpoint,
    success: function (response) {
      renderTweets(response);
    },
    dataType: "json"
  });
};