$(document).ready(function () {

  // listening for new tweet form handling event
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
      renderErrorMessage("The tweet cannot be empty!")
      return;
    }
    // form validation too long
    if (tweetText.length > 140) {
      renderErrorMessage("The tweet cannot exceed 140 characters!");
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
        // slide up & clear error message showing from previously invalid tweet
        $("#tweet-error").addClass("no-error").empty();
      },
      dataType: "json"
    });
  });

  // when the "write a tweet" area is clicked, toggle form display
  $(".right-side-nav").on("click", function() {
    $(".tweet-form").slideToggle("slow", function() {
      // once the animation completes 
      $(this).find("textarea").focus();
    });
  });

  //toggle button visibility on scroll
  $(window).on("scroll", function() {
    const $toTop = $(".to-top-icon");
    // use scroll top to determine current vertical position of window
    if ($(this).scrollTop() > 50) {
      // scrolled more than 50px down, show icon
      $toTop.fadeIn();
    } else {
      $toTop.fadeOut();
    }
  });
  // smooth scroll animation
  $(".to-top-icon").on("click", function(event) {
    // prevent the sudden jump to top with href="#"
    event.preventDefault()
    $("html, body").animate({scrollTop: 0}, "slow");
  });


  //load tweets on load 
  loadTweets();
});