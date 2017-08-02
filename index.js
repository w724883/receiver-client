var request = require('request');
var path = require('path');
var fs = require('fs');
var url = require('url');

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
    if(params.length){
        params.forEach(function(value,key){
            if(!value.from || !value.to) return "Arguments are required!";
            list(value.from,value.excludes,function(ways,depth){    
                fs.stat(ways, function(err, stats) {
                    if(stats.isFile()){
                        var parse = url.parse(value.to)
                        var host = parse.protocol+'//'+parse.host;
                        var form = request.post(host+'/receiver').form();
                        form.append('to',path.join(parse.pathname,path.relative(value.from,ways)));
                        form.append('file', fs.createReadStream(ways));
                        console.log(ways);
                    }
                });
            });
        });
    }else{
        return "Arguments are Array!"
    }
    
}
