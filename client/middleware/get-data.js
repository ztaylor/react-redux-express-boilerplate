const mysql = require('mysql2');
const dbCredentials = require('./config.js');
const fs = require('fs');
// Establish Connection
const connection = mysql.createConnection(dbCredentials);

module.exports = (req, res, next) => {
    connection.connect();

    try {
        req.id = parseInt(req.query.id);
        const sql = "SELECT * FROM user_info WHERE ID=?";

        console.log('called ' + req.id);

        connection.query(sql, [req.id], (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            try {
                const data = {
                    firstname: results[0].firstname, surname: results[0].surname, emailAddress: results[0].emailAddress,
                    telephone: results[0].telephone, gender: results[0].gender, dob: results[0].dob, comments: results[0].comments
                };

                var data_ = JSON.stringify(data);

                // write JSON string to a file
                fs.writeFileSync('./client/data/'.concat('User'+req.id+'.json'), data_, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("JSON data is saved.");
                });

                res.send(data);

            } catch (e) {
                return next(new Error('Error with request'));
            }
        });
    } catch (ex) { 
        console.log('error ' + ex);
        return next(new Error('Error with request'));
    }
};  
