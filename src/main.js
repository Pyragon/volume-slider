var express = require('express');
var app = express();
var jade = require('jade');
var merge = require('merge');
var http = require('http').Server(app);

var options = {
  fileName: 'index.jade',
  compileDebug:  false,
  pretty: false
};

var locals = {};

http.listen(8082, function() {
  console.log('My volume slider is running');
});

app.use(express.static('public'));

app.get('/', function(req, res) {
  var html = jade.renderFile('public/index.jade', merge(options, locals));
  res.status(200).send(html);
});
