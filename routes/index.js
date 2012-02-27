var request = require('request');

exports.index = function(req, res){
  res.render('index')
};

exports.tweets = function(req, res) {
  request.get('http://search.twitter.com/search.json?q=node.philly', function(error, response, body) {
    var toDisplay = [];
    
    if (!error && response.statusCode == 200) {
      var tweets = JSON.parse(body);
      
      tweets.results.forEach(function(tweet) {
        toDisplay.push({
          id: tweet.id,
          user: tweet.from_user,
          user_name: tweet.from_user_name,
          user_profile_image: tweet.profile_image_url,
          text: tweet.text
        });
      });
    }
    
    res.send(toDisplay);
  });
};
