var request = require('request');
var path = require('path');
var fs = require('fs');

function list(ways, excludes, handleFiles, depth) {
    depth = depth || 0;
    handleFiles(ways, ++depth);  
    fs.readdir(ways, function(err, files) {  
        if (err) {  
            console.log('readdir error');  
        } else {  
            files.forEach(function(item) {
                if(item.indexOf(excludes) >= 0){
                    return false;
                }
                var tmpPath = ways + '/' + item;  
                fs.stat(tmpPath, function(err1, stats) {  
                    if (err1) {  
                        console.log('stat error');  
                    } else {  
                        if (stats.isDirectory()) {  
                            list(tmpPath, excludes, handleFiles, depth);  
                        } else {
                            handleFiles(tmpPath, depth);  
                        }  
                    }  
                })  
            });  
  
        }  
    });  
}  


module.exports = function(params){

    if(!params.from || !params.to || !params.host) return "Arguments are required!";
    list(params.from,params.excludes,function(ways,depth){    
        fs.stat(ways, function(err, stats) {
            if(stats.isFile()){
                var form = request.post(params.host+'/receiver').form();
                form.append('to',path.join(params.to,path.relative(params.from,ways)));
                form.append('file', fs.createReadStream(ways));
                console.log(ways);
            }
        });
    });
}
