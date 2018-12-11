const path = require('path');
const os = require('os');
const fs = require('fs');
const parse = require('csv-parse');

function clearResults(dest_filename){
    const filename = path.join(dest_filename);
    if(fs.existsSync(filename))
    {
        fs.unlinkSync(filename);
    }
}

function saveGetUserResult(dest_filename, user_id, results){
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);

    const filename = path.join(dest_filename);
    if(!fs.existsSync(filename))
    {
        const row = []; 
        row.push('id');
        row.push('first_name');
        row.push('last_name');
        row.push('avatar');

        const header = []; 
        header.push(row.join());
        
        fs.appendFileSync(filename, header.join(os.EOL) + '\n');   
    }

    const output = []; 
    const row = []; 
    row.push(user_id);
    row.push(results.first_name);
    row.push(results.last_name);
    row.push(results.avatar);

    output.push(row.join());
    fs.appendFileSync(filename, output.join(os.EOL) + '\n');
}

function createUsersJSON(csv_input,json_output)
{
    var jsonArray=[];
    fs.createReadStream(csv_input)
        .pipe(parse({delimiter: ','}))
        .on('data', function(csvrow) {
            var jsonUser = {
                'id': csvrow[0],
                'expected': {
                    'first_name': csvrow[3],
                    'last_name': csvrow[4],
                    'avatar': csvrow[5],
                }
            };
            jsonArray.push(jsonUser);        
        })
        .on('end',function() {
          //do something wiht csvData
          console.log(jsonArray);
          var content = '{\"users\":' + JSON.stringify(jsonArray) + '}' 
          fs.appendFileSync(json_output, content);
        });
}

module.exports.clearResults = clearResults;
module.exports.saveGetUserResult = saveGetUserResult;
module.exports.createUsersJSON = createUsersJSON;

