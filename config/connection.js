//Initialize MySQL connection.
var mysql = require("mysql");

//Provide Login and specifics to connected to mySQL
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "C0d!ng101520",
    database: "burger_db"
  });
};

// Make connection to database.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection to be sed in ORM.js
module.exports = connection;
