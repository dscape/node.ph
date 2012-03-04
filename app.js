var io = require('socket.io'),	
	express = require('express'),
	twitter = require('ntwitter');

var app = express.createServer(),
	io = require('socket.io').listen(app);

app.configure(function(){
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/static'));
  app.use(express.errorHandler());
});

var twit = new twitter({
    consumer_key: 'f634xNy9wp9VcoY5V8ygA',
    consumer_secret: '2stzJoEjXiN8nvynN3eL9YroIdAbsjlLGmT2M3gzs',
    access_token_key: '104793047-luKK7cCdk3no6AZJH79i4R3RGsMLDUuBGxUTsmZG',
    access_token_secret: 'BtpogtuaSHEjoSsRp8nT9DCz6wPfkzGEoHmPMDhk'
});

var recent_tweets = new Array(3);
var recent_tweets_index = -1;

twit.search('#nodephilly OR @NodePhilly', { rpp: 5 }, function(err, data) {
    if (err) { return; }
    
    for (var i=0; i<data.results.length; i++) {
        recent_tweets[++recent_tweets_index] = {
        	id: data.results[i].id,
            user: {
            	screen_name: data.results[i].from_user
            },            
            text: data.results[i].text
        };
    }
    
    twit.stream('statuses/filter', { track: '#nodephilly' }, function(stream) {
	    stream.on('data', function(data) {
			if (recent_tweets_index == recent_tweets.length-1) {
				recent_tweets_index = -1;
			}
			recent_tweets[++recent_tweets_index] = data;
			 
	        io.sockets.emit('tweet', data);
	    });
	});
});

app.listen(3000);

io.sockets.on('connection', function(socket) {
	for (var i=0; i<recent_tweets.length; i++) {
		socket.emit('tweet', recent_tweets[i]);	
	}    
});
