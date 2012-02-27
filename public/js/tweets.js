$(document).ready(function() {
  loadTweets();
  setTimeout("loadTweets()", 60000);
});

var last_tweet_id = 0;
function loadTweets() {
  $.get('http://localhost:3000/tweets', function(result) {  	  	
    result.forEach(function(tweet) {
      if (tweet.id > last_tweet_id) {
      	$('#tweets').prepend('\
      	  <li>\
      	    <div class="tweet">\
      	      <p class="user">' + injectUserLinks("@" + tweet.user) + ':</p>\
      	      <p class="text">' + injectUserLinks(tweet.text) + '</p>\
      	    </div>\
      	  </li>\
      ');
      }
    });
    
    last_tweet_id = result[0].id;
  });
};

function injectUserLinks(text) {
  return text.replace(/@([^\W]*)/g, '<a href="https://www.twitter.com/#!/$1" target="_blank">@$1</a>');
};
