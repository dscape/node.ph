// get tweets

$(document).ready(function() {
  loadTweets();
});

var last_tweet_id = 0;
function loadTweets() {
  var url = '/tweets/since/' + last_tweet_id;

  $.get(url, function(result) {  	  	
    result.tweets.forEach(function(tweet) {
      if ($('#tweets li[id="' + tweet.id + '"]').length == 0) {      
        var markup = '\
          <li id="' + tweet.id + '">\
     	      <p class="user">' + injectUserLinks("@" + tweet.user) + '</p>\
     	      <p class="text">' + injectUserLinks(tweet.text) + '</p>\
       	  </li>\
        ';

        if (last_tweet_id == 0) {
          $('#tweets').append(markup);
        } else {
          $('#tweets').prepend(markup);
        }
      }
    });
    
    last_tweet_id = result.max_id;
  });

  setTimeout("loadTweets()", 10000);
};

function injectUserLinks(text) {
  return text.replace(/@([^\W]*)/g, '<a href="https://www.twitter.com/#!/$1" target="_blank">@$1</a>');
};
