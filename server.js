var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/:system', function (req, res) {
   var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('systems.json', 'utf8'));
    var system = req.params.system;
    res.send("System: " + system + "<br/>System URL: " + obj[system].url);
})

var server = app.listen(process.env.PORT || 8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})