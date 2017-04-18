const transitroutes = require('express').Router({ mergeParams: true });
const getSystem = require('../util/getSystem.js');
const seeAll = require("./seeAll")

transitroutes.use(function (req, res, next) {
    req["sys"] = getSystem.getSystem(req.params.sys);
    console.log("Selected System: " + JSON.stringify(req.sys));
    next();
});

transitroutes.use('/routes', seeAll);

transitroutes.get('/', (req, res) => {
    if (req.sys != null)
        res.status(200).json(req.sys);
    else
        res.status(404).json({ "Error":"Not a registered transit system" });
  
});

module.exports = transitroutes;