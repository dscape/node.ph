var request = require('request');

exports.tweets = function(req, res) {
  var url = 'http://search.twitter.com/search.json?q=%23nodephilly&result_type=recent&rpp=3&lang=en';
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
          text: tweet.text
        });
      });
    }

    res.send(result);
  });
};
