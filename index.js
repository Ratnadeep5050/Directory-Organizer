var util = require('./utility');

var fileExist = util.fileExists(process.argv.slice(2)[0]);

if(fileExist) {
    var allAreDirectories = util.areAllDirectories("/home/user/workspace/Directory-Organizer");
    if(allAreDirectories) {
        console.log("No operation");
    }
    else {
        util.createDirectory(process.argv.slice(2)[0]);
    }
}
//util.directoryExists(process.argv.slice(2)[0]);