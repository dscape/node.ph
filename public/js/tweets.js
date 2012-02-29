// get tweets

$(document).ready(function() {
  loadTweets();
});

var last_tweet_id = 0;
function loadTweets() {
  var url = '/tweets/since/' + last_tweet_id;

  $.get(url, function(result) {  	  	
    for (var i=0; i<result.tweets.length; i++) {
      var tweetCount = $('#tweets li').length;

      if ($('#tweets li[id="' + result.tweets[i].id + '"]').length == 0) {
        var markup = '\
          <li id="' + result.tweets[i].id + '">\
     	      <p class="user">' + injectLinks("@" + result.tweets[i].user) + '</p>\
     	      <p class="text">' + injectLinks(result.tweets[i].text) + '</p>\
       	  </li>\
        ';

        if (last_tweet_id == 0) {
          $('#tweets').append(markup);
        } else {
          if (tweetCount == 3) {
            $('#tweets li:last').fadeOut(function() {
              $('#tweets').prepend(markup);
            });
          } else {
            $('#tweets').prepend(markup);
          }
        }
      }
    }
    
    last_tweet_id = result.max_id;
  });

  setTimeout("loadTweets()", 60000);
};

function injectLinks(text) {
  // links
  var result = text.replace(/([a-zA-Z]*:\/\/[a-zA-Z0-9\.\-\/]*)/g, '<a href="$1" target="_blank">$1</a>');

  // users
  result = result.replace(/@([a-zA-Z0-9_]*)/g, '<a href="http://www.twitter.com/$1" target="_blank">@$1</a>');

  // hashtags
  result = result.replace(/#([a-zA-Z0-9]*)/g, '<a href="https://twitter.com/#!/search/%23$1" target="_blank">#$1</a>');

  return result;
};
