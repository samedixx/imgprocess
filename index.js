const list = require('./list.json')
const fs = require('fs')
const ExternalService = require('./externalService')
var request = require('request').defaults({ encoding: null, timeout: 1500 });

async function start(){
    for(let i = 0; i < list.length; i++){
        var filename = list[i].link.substring(list[i].link.lastIndexOf('/') + 1)
        var url = list[i].way + ':' + list[i].link;
        console.debug("Downloading", url)
        try{
            let aa = await new Promise((resolve, reject) => {
                request.get(url, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        let data = Buffer.from(body).toString('base64');
                        require("fs").writeFile('./downloadImgs/' + filename, data, 'base64', function(err) {
                            if(!err) {
                                resolve("ok")
                                console.log('./downloadImgs/' + filename + " saved");
                            }else {
                                reject("error")
                                console.log(err);
                            }
                        });
                    }else{
                        reject("error")
                    }
                });
            });
        }catch(e){
        }
        
    }
}

console.debug("Starting download");
start();