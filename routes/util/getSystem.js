
module.exports = {
  getSystem: function(value){
    var fs = require('fs');
    var systems = JSON.parse(fs.readFileSync('./systems.json', 'utf8'));
    return systems[value];
  }
};