const routeinfo = require('express').Router({ mergeParams: true });
const routefiles = require("./route")

function getAllRoutes_Syncromatics(res, url){
    var https = require('https');

    var options = {
        host: url,
        path: '/Regions',
        port: 443,
        method: 'GET',
        headers: {
            accept: '*/*'
        }
    };
    callback = function(response) {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            var dataRt = JSON.parse(str);

            var responses = 0;
            var rawRt = {};

            function rtCallback(resp2){
                resp2.on( 'data', function ( chunk ) {
                    var reg = resp2.client._httpMessage._header.slice(12);
                    reg = reg.substring(0, reg.indexOf('/'));
                    rawRt[reg]= ( chunk.toString() );
                });

                resp2.on( 'end', function () {
                    if (++responses === dataRt.length) {
                        for (var i = 0; i < dataRt.length; ++i)
                        {
                            dataRt[i]['routes'] = [];
                            var routes = JSON.parse(rawRt[dataRt[i].ID]);
                            for (var j = 0; j<routes.length; ++j)
                            {
                                var dirs = []
                                for (dir in routes[j].Patterns){
                                    dirs.push({ID: dir.ID, Name:dir.Name});
                                }

                                var objRoute = {
                                    ID: routes[j].ID,
                                    Color: routes[j].Color,
                                    ShortName: routes[j].ShortName,
                                    Name: routes[j].Name,
                                    Directions: dirs
                                };
                                dataRt[i].routes.push(objRoute);
                            }
                        }
                        res.status(200).json(dataRt);
                    }
                } );
            }

            for (var i = 0; i < dataRt.length; ++i)
            {
                options['path']="/Region/" + dataRt[i].ID + "/Routes";
                https.request(options, rtCallback).end();
            }
        });
    }

     https.request(options, callback).end();
}

routeinfo.use('/:rt', routefiles);

routeinfo.get('/', (req, res) => {
  console.log("hi!");

  if (req.sys != null)
    switch(req.sys['type']){
        case "gtfs-rt":
            res.status(400).json({ "Message":"GTFS support coming soon" });
            break;
        case "syncromatics":
            console.log(req.sys['url']);
            getAllRoutes_Syncromatics(res, req.sys['url'])
            break;
        case "default":
            res.status(200).json({ "Nope":"Nope" });
            break;

    }
    else{
        res.status(404).json({ "Error":"Not a registered transit system" });
    }
});

module.exports = routeinfo;