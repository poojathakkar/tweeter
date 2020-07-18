/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.

const renderTweets = function(tweets) {
  // loops through tweets
  tweets.forEach(tweet => {
    console.log(tweet);
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('.tweets-container').prepend(createTweetElement(tweet));
  });
};

const createTweetElement = (data) => {

  let $tweet = `
      <article class="tweet-container">
        <header class="tweet-header">
          <section class="imagenameandhandle">
            <div class="imgandname">
              <img src="${data.user.avatars}"> 
              <h6>${data.user.name}</h6>
            </div>
            <div> 
              <h6 class="userhandle">${data.user.handle}</h6>
            </div>
          </section>
          <article class="article">${escape(data.content.text)}</article>
        </header>
        <footer>10 days ago
          <div class="options">
            <span><i class="fa fa-flag" aria-hidden="true"></i></span>
            <span><i class="fa fa-retweet" aria-hidden="true"></i></span>
            <span<i class="fa fa-heart" aria-hidden="true"></i></span>
          </div>
        </footer>
      </article>
  `;
  return $tweet;
}

const loadTweets = function() {
  $.ajax({ url: '/tweets', method: 'GET' })
    .then(function(tweets) {
      renderTweets(tweets);
    })
 };

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  console.log(div.innerHTML)
  return div.innerHTML;
}

$(document).ready(function() {
  //for error message to be disappear as soon as it is in the limit 
  $("#tweet-text").keypress( function() {
    if ($('#tweet-text').val().length > 0) {
      $('.empty-tweet').slideUp();
    }
    if ($('#tweet-text').val().length < 140) {
      $('.too-long').slideUp();
    }
  })
  loadTweets();
  $('.tweetform').on('submit', function(evt)  {
    evt.preventDefault();
    // .text needs to target an element and have within it the text itself
    let data = $(this).serialize();
    //to get value without text=
    let tweetValue = $('#tweet-text').val();
    //to show error messages
    if (tweetValue === "") {
      $('.empty-tweet').slideDown();
    } else if (tweetValue.length > 140) {
      $('.too-long').slideDown();
    } else {
      $('.too-long').slideUp();
      $('.empty-tweet').slideUp();
    // load tweets here using ajax
      $('#tweet-text').val('');
      $.ajax({
        url: "/tweets",
        method: 'POST',
        data: data
      }).then(function(response) {
      console.log(response);
      //remove tweets from the tweet container      
      $('.tweet-container').empty();
      $("output.counter").text(140);
      //to slide up the tweet if condition of null and too long is invalid
      $('.too-long').slideUp();
      $('.empty-tweet').slideUp();
      // load tweets here using ajax
      loadTweets();
      }).catch((e) => console.log(e));
    }
  })
});

