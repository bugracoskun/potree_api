const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');

module.exports = {
    addfile(data,callback){
        //console.log(data);
        var string=data.file;
        var buffer = new Buffer(string.split(",")[1], 'base64');

        fs.writeFile('./dataa/'+data.name+'-'+data.id+'.las', buffer, function (err,data2) {
            if (err) {
              return console.log(err);
            }
            console.log(data2);

            //var command=__dirname+"/converter/PotreeConverter.exe "+data.data+" -o ./data/data_converted --overwrite";
            var command=__dirname+"/converter/PotreeConverter.exe ./dataa/"+data.name+'-'+data.id+".las -o ./public/"+data.id+" --overwrite";
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                callback({status:true,message:"addfile İsteği Başarılı",data:{id:data.id}})
            });
        });

        
        
    },
}