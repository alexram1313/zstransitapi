var express = require('express');
var routes  = express.Router({ mergeParams: true });

routes.get('/', function (req, res) {
    res.send(req["url"]);
})


module.exports = routes;