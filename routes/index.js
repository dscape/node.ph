var request = require('request');

exports.index = function(req, res){
  res.redirect('/index.html');
};

exports.tweets = function(req, res) {
  var url = 'http://search.twitter.com/search.json?q=nodejs&result_type=recent&rpp=3&lang=en';
  if (req.params.last > 0) {
    url += '&since_id=' + req.params.last;
  }

  request.get(url, function(error, response, body) {
    var result = {
      max_id: 0,
      tweets: []
    };
    
    if (!error && response.statusCode == 200) {
      var tweets = JSON.parse(body);

      result.max_id = tweets.max_id;      

      tweets.results.forEach(function(tweet) {
        result.tweets.push({
          id: tweet.id,
          user: tweet.from_user,
          user_name: tweet.from_user_name,
          user_profile_image: tweet.profile_image_url,
          text: tweet.text
        });
      });
    }

    res.send(result);
  });
};
