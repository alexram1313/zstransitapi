const getSystem = require('../util/getSystem.js');

function getAllRoutes_Syncromatics(res, url){
    var http = require('http');

    var options = {
    host: url,
    path: '/Regions'
    };

    callback = function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
        res.status(200).json(JSON.parse(str));
    });
    }

    http.request(options, callback).end();
}

module.exports = (req, res) => {
  console.log("hi!");

  if (req.sys != null)
    switch(req.sys['type']){
        case "syncromatics":
            getAllRoutes_Syncromatics(res, req.sys['url'])
            // res.status(200).json(getAllRoutes_Syncromatics(req.sys['url']));
            break;
        case "default":
            res.status(200).json({ "Nope":"Nope" });
            break;

    }
    else{
        res.status(404).json({ "Error":"Not a registered transit system" });
    }
};