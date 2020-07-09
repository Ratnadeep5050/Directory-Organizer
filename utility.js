const fs = require('fs');

exports.fileExists = function(path) {
    var files = fs.readdirSync(path);
    if(files.length > 0) {
        return true;
    }
    else {
        return false;
    }
}

exports.areAllDirectories = function(path) {
   var files = fs.readdirSync(path);
   var directoryCount = 0;
   for (let i = 0; i < files.length; i++) {
       var filename = files[i];
       var filenameArray = filename.split(".");

       if(fs.statSync(filename).isDirectory()) {
            directoryCount++;
       }
   }

   if(directoryCount == files.length) {
        return true;
   }
   else {
       return false;
   }
}

exports.createDirectory = function(path) {
    var fileTypes = this.checkFileTypes(path);
    var fileTypesArray = Array.from(fileTypes);

    for(let i=0; i<fileTypesArray.length; i++) {
        fs.mkdirSync(path+"/"+fileTypesArray[i]);
    }
}

exports.checkFileTypes = function(path) {
    var files = fs.readdirSync(path);
    var fileType = new Set();
    for(let i=0; i<files.length; i++) {
        var filename = files[i];
        var filenameArray = filename.split(".");

        if(!fs.statSync(filename).isDirectory()) {
            fileType.add(filenameArray[1]);
        }
    }
    return fileType;
}

exports.moveToDirectory = function(path, file) {

}

/*
var directoryExists = function(path) {
    return fs.readdirSync(path).filter(function(file) {
        console.log(fs.statSync(path+file).isDirectory());
    });
}
*/

exports.directoryExists = function(path) {
    fs.readdir(path, (err, file) => {
        console.log(file);
    });
}
