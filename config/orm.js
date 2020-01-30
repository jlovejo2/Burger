//call connection.js file and import mysql connection
const connection = require("../config/connection.js")


//Function generates a string of question marks based on the number parameter.
//This was taken from CAT_ORM_MVC activity
// Changed it so the string is generated with parenthese aroud questions marks
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// function to converts object key/value pairs to SQL syntax
//taken from cat_ORM_MVC activity
function objToSql(obj) {
  let arr = [];

  // loop through the keys in the object
  for (let key in obj) {
    const value = obj[key];

    // check to skip hidden properties
    if (Object.hasOwnProperty.call(obj, key)) {

      //This if statement runs code inside if its a string with spaces and then adds quotations add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  console.log(arr.toString());
  return arr.toString();
}

// Object for all SQL statement functions.
const orm = {

    //this function takes a table name from database, and a callback function as parameters.  It runs an sql query database for all values in
    //the table being sent as a parameter
  all: function(table1, cb) {
    const queryString = `SELECT * FROM  ${table1};`;
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  //this function inserts the values specified into the columns sepecificied and returns the results to a designated callback function
  create: function(table1, col1, val1, cb) {

    const queryString = `INSERT INTO ${table1} ( ${col1.toString()} ) VALUES ( ${printQuestionMarks(val1.length)});`

    console.log(val1);
    console.log(queryString);

    connection.query(queryString, val1, function(err, result) {
      if (err) throw err;

      cb(result);
    });
  },


  // An example of objColVals would be {name: panther, sleepy: true}
  //This function will update the column 
  //The result will be delivered as a parameter to a designated callback function
  update: function(table1, multipleColObj, condition, cb) {
    const queryString = `UPDATE ${table1} SET ${objToSql(multipleColObj)}
                        WHERE ${condition};`

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) throw err;

      cb(result);
    });
  },

  //This function will delete the specified condition from the table delivered in the parameters.
  //The result will be delivered to a designated callback function
  delete: function(table1, condition, cb) {
    const queryString = `DELETE FROM ${table1}
                        WHERE ${condition};`;

    connection.query(queryString, function(err, result) {
      if (err) throw err;
           cb(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
