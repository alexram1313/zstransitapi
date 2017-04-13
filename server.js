var express = require('express');
var app = express();

function getSystem(sys){
    var fs = require('fs');
    var systems = JSON.parse(fs.readFileSync('systems.json', 'utf8'));
    return systems[sys].type;
}


app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/:sys', function (req, res) {
    var fs = require('fs');
    var systems = JSON.parse(fs.readFileSync('systems.json', 'utf8'));
    var sys = req.params.sys;
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(systems[sys]));
})

app.get('/:sys/routes', function (req, res) {
    var sys = req.params.sys;
    var type = getSystem(sys);
    // res.writeHead(200, {"Content-Type": "application/json"});
    res.end(type);
})

var server = app.listen(process.env.PORT || 8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("API listening at http://%s:%s", host, port)
})