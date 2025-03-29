$(document).ready(function () {

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

  // logic for how to render all tweets
  const renderTweets = function (tweetArr) {
    for (const tweet of tweetArr) {
      const $tweet = createTweetElement(tweet);
      // prepend to put the newest on top
      $('#tweets-container').prepend($tweet);
    }

  }

  // new tweet form handling
  $('#create-tweet-form').on("submit", function (event) {
    // prevents reloading on submit
    event.preventDefault();
    const formInfo = $(this).serialize();
    const endpoint = "/api/tweets";

    // get the context of the text area for validation
    const tweetText = $('textarea[name="text"]').val();

    // form validation empty
    if (
      tweetText === "" ||
      tweetText === null ||
      tweetText.trim().length < 0
    ) {
      alert("The tweet cannot be empty!");
      return;
    }
    // form validation too long
    if (tweetText.length > 140) {
      alert("The tweet cannot exceed 140 characters!");
      return;
    }
    // if valid, post
    $.ajax({
      type: "POST",
      url: endpoint,
      data: formInfo,
      success: function (response) {
        // empty container so tweets are not re-appended (duplicated)
        $('#tweets-container').empty();
        loadTweets();
        //reset the tweetText 
        $('textarea[name="text"]').val("")
      },
      dataType: "json"
    });
  });

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

  //load tweets on load 

  loadTweets();
});