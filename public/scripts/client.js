$(document).ready(function() {

  const createTweetElement = function(tweetObj) {
    const timestamp = timeago.format(tweetObj.created_at - 11 * 1000 * 60 * 60); // returns in format like '11 hours ago'
    // the HTML to render 
    
    return $(`
      <article class="tweet">
        <header>
          <div class="person-info">
          <img src=${tweetObj.user.avatars}>
          <strong>${tweetObj.user.name}</strong>
          </div>
          <small>${tweetObj.user.handle}</small>
        </header>

      <p>${tweetObj.content.text}</p>
      <footer>
        <div class="post-date">
          <small>${timestamp}</small>
        </div>
        <div class="tweet-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    
      `);
  }
  
  // logic for how to render all tweets
  const renderTweets = function(tweetArr) {
    for (const tweet of tweetArr) {
      const $tweet = createTweetElement(tweet);
      // prepend to put the newest on top
      $('#tweets-container').prepend($tweet);
    }

  }

  // new tweet form handling
  $('#create-tweet-form').on("submit", function(event) {
    // prevents reloading on submit
    event.preventDefault();
    const formInfo = $( this ).serialize();
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
      success: function(response) {
        $('#tweets-container').empty();
        loadTweets();
        //reset the tweetText 
        $('textarea[name="text"]').val("")
      },
      dataType: "json"
    });
  });

  // fetching tweets from /tweets
  const loadTweets = function() {

    const endpoint = "/api/tweets";

    // shorthand ajax function
    $.ajax({
      type: "GET",
      url: endpoint,
      success: function(response) {
        renderTweets(response);
      },
      dataType: "json"
    });
  };

  //load tweets on load 

  loadTweets();
});