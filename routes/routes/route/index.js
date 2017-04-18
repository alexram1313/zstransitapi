const routeinfo = require('express').Router({ mergeParams: true });

function getRouteInfo_Syncromatics(res, url, rt)
{
    var https = require("https");
    var options = {
        host: url,
        path: '/Route/'+rt,
        port: 443,
        method: 'GET',
        headers: {
            accept: '*/*'
        }
    };
    var callback = function(response){
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function(){
            var rawRt = JSON.parse(str);
            var dirs = []
            for (dir in rawRt.Patterns){
                dirs.push({ID: dir.ID, Name:dir.Name});
            }

            var objRoute = {
                ID: rawRt.ID,
                Color: rawRt.Color,
                ShortName: rawRt.ShortName,
                Name: rawRt.Name,
                Directions: dirs
            };
            res.status(200).json(objRoute);
        });
    };

    https.request(options, callback).end();


}

routeinfo.get('/', (req, res) => {

    if (req.sys != null)
        switch(req.sys['type']){
            case "gtfs-rt":
                res.status(400).json({ "Message":"GTFS support coming soon" });
                break;
            case "syncromatics":
                getRouteInfo_Syncromatics(res, req.sys['url'], req.params.rt);
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