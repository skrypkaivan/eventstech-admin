'use strict';

// Module dependencies.
var express = require('express'),
  path = require('path'),
  fs = require('fs');

var app = express();


// Express Configuration
app.configure('development', function(){
  app.use(require('connect-livereload')());
  app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
  app.set('views', __dirname + '/app');
});

app.configure('production', function(){
  app.use(express.favicon(path.join(__dirname, 'dist', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, 'dist')));
  app.set('views', __dirname + '/views');
});

app.configure(function(){
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  // Router needs to be last
  app.use(app.router);
});

// Controllers
var api = require('./lib/controllers/api'),
    controllers = require('./lib/controllers');

// Server Routes
app.all('/events/categories', api.responseOk);
app.all('/speakers/categories', api.responseOk);
app.post('/speakers', api.responseOk);
app.put('/speakers', api.responseOk);
app.delete('/speakers', api.responseOk);
app.post('/events', api.responseOk);
app.put('/events', api.responseOk);
app.delete('/events', api.responseOk);

// Angular Routes
app.get('/views/*', controllers.views);
app.get('/*', controllers.index);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});