
/**
 * Module dependencies.
 */
var express = require('express');
var routes  = require('./routes');
var parse   = require('./routes/parse');
var http    = require('http');
var marked  = require('marked');
var path    = require('path');
var logger  = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// Initialize marked
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  langPrefix: 'language-'
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

if ('development' === app.get('env')) {
  var errorHandler = require('errorhandler');
  app.use(errorHandler());
}

app.get('/', routes.index);
app.post('/parse', parse.parse(marked));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
