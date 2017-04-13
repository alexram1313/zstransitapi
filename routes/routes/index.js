const transitroutes = require('express').Router({ mergeParams: true });
const getSystem = require('../util/getSystem.js');
const seeAll = require("./seeAll")

transitroutes.get('/routes', seeAll);

transitroutes.get('/', (req, res) => {
    console.log("derp " + req.params.sys);
  res.status(200).json({ message: 'Connected!' });
  
});

module.exports = transitroutes;