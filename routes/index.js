const routes = require('express').Router( {mergeParams: true });
const transitroutes = require('./routes')

routes.use('/:sys', transitroutes);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
  console.log("lol");
});


module.exports = routes;