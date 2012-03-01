var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

app.configure(function(){
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/static'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/tweets/since/:last', routes.tweets);

app.listen(3000);
