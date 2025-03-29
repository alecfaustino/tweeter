/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  // Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
  
  const createTweetElement = function(tweetObj) {
    
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
          <small>${tweetObj.created_at}</small>
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
  
  
  const renderTweets = function(tweetArr) {
    for (const tweet of tweetArr) {
      const $tweet = createTweetElement(tweet);
      createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }

  }

  renderTweets(data);
});