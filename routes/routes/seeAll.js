const getSystem = require('../util/getSystem.js');

function getAllRoutes_Syncromatics(url){
    return {"url":url};
}

module.exports = (req, res) => {
  console.log("hi!");

  if (req.sys != null)
    switch(req.sys['type']){
        case "syncromatics":
            res.status(200).json(getAllRoutes_Syncromatics(req.sys['url']));
            break;
        case "default":
            res.status(200).json({ "Nope":"Nope" });
            break;

    }
    else{
        res.status(404).json({ "Error":"Not a registered transit system" });
    }
};