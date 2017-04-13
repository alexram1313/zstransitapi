const getSystem = require('../util/getSystem.js');

function getAllRoutes_Syncromatics(url){
    return {"url":url};
}

module.exports = (req, res) => {
  const sysinfo = getSystem.getSystem(req.params.sys);

  console.log("hi!");
  switch(sysinfo['type']){
      case "syncromatics":
        res.status(200).json(getAllRoutes_Syncromatics(sysinfo['url']));
        break;
      case "default":
        res.status(200).json({ "Nope":"Nope" });
        break;

  }
};