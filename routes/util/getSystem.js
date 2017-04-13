
module.exports = {
  getSystem: function(value){
    console.log("Crap!");
    var fs = require('fs');
    var systems = JSON.parse(fs.readFileSync('./systems.json', 'utf8'));
    return {'type':systems[value].type, 'url':systems[value].url};
  }
};