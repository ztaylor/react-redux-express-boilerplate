const mysql = require('mysql2');
const dbCredentials = require('./config.js');

// Establish Connection@firstname, @surname, @emailAddress, @telephone, @gender, @dob, @comments
const connection = mysql.createConnection(dbCredentials);

module.exports = (req, res, next) => {
    connection.connect();

    //console.log('state ' + req.body.firstname);
  
    req.firstname = req.body.firstname;
    req.surname = req.body.surname;
    req.email_address = req.body.email_address;
    req.telephone = req.body.telephone;
    req.gender = req.body.gender; 
    req.dob = req.body.dob;
    req.comments = req.body.comments;

    let id;
    const sql = "INSERT INTO user_info (firstname, surname, emailAddress, telephone, gender, dob, comments)" +
        "VALUES(?,?,?,?,?,?,?)";
 
    connection.query(sql, [req.firstname, req.surname, req.email_address, req.telephone,
    req.gender, req.dob, req.comments],  (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        } 
        
       
        
        const id = results.insertId;
        res.send({id: id});
       
    });  

    //connection.end(); 
};
