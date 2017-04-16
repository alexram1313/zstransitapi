var express = require('express');
var app = express();
var routes = require('./routes');


process.on('uncaughtException', function(err) {
  console.log("Error: " + err);
});

app.use('/', routes);


var server = app.listen(process.env.PORT || 8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("API listening at http://%s:%s", host, port)
});