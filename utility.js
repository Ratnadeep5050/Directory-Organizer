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

       if(fs.statSync(path+filename).isDirectory()) {
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
        var directoryExists = this.directoryExists(path, fileTypesArray[i]);
        
        if(!directoryExists) {
            fs.mkdirSync(path+"/"+fileTypesArray[i]);
        }
    }
}

exports.directoryExists = function(path, dirName) {
    var files = fs.readdirSync(path);
    
    for(let i=0; i<files.length; i++) {
        var filename = files[i];
        if(filename == dirName) {
            if(fs.statSync(path+"/"+dirName).isDirectory()) {
                return true;
            }
        }
    }

    return false;
}

exports.checkFileTypes = function(path) {
    var files = fs.readdirSync(path);
    var fileType = new Set();
    for(let i=0; i<files.length; i++) {
        var filename = files[i];
        var filenameArray = filename.split(".");

        if(!fs.statSync(path+filename).isDirectory()) {
            fileType.add(filenameArray[1]);
        }
    }
    return fileType;
}

exports.moveFiles = function(path) {
    var files = fs.readdirSync(path);
    var fileTypes = this.checkFileTypes(path);
    var fileTypesArray = Array.from(fileTypes);
    
    for(let i=0; i<files.length; i++) {
        var filename = files[i];
        var filenameArray = filename.split(".");
        var fileType = filenameArray[1];

        if(!fs.statSync(path+"/"+filename).isDirectory()) {
            if(filenameArray[0] != "") {
                var currentPath = path+"/"+filename;
                var destinationPath = path+"/"+fileType+"/"+filename;
                
                fs.renameSync(currentPath, destinationPath);
            }
        }
    }
}


