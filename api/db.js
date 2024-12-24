var mysql = require('mysql');
var config = require('./config');
connection = mysql.createConnection(config.database);
connection.connect(err => {
    if (!err) console.log("Database is connected");
    else console.log("Error while connecting with database");
});
module.exports = connection;