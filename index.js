var util = require('./utility');

var fileExist = util.fileExists(process.argv.slice(2)[0]);
var file = process.argv.slice(2)[0];

if(fileExist) {
    var allAreDirectories = util.areAllDirectories(file);
    if(allAreDirectories) {
        console.log("No operation");
    }
    else {
        util.createDirectory(process.argv.slice(2)[0]);
        util.moveFiles(file);
    }
}
//util.directoryExists(process.argv.slice(2)[0]);