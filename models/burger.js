// ORM.js is imported to create functions that will interact with the datbased.
const orm = require("../config/orm.js");


//Currently this file and therefor this object essentially exist to specify the table parameter in all the orm functions
const burgers = {
    //This is calling the all function created in the orm.js inside another function called all.
    //It is grabbing all the values in the burgers database.  and then delivering that query response as a parameter to a callback function
  all: function(cb) {
    orm.all("burgers", function(res) {
      cb(res);
    });
  },
  // This function is grabbing create from orm.js  It is inserting the values in the vals array into the columns in cols array
  // into the burgers table.  Then that response is being deliver as a parameter to designated callback function
  create: function(colsArr, valsArr, cb) {
    orm.create("burgers", colsArr, valsArr, function(res) {
      cb(res);
    });
  },
  // This function is grabbing the update from orm.js.
  // It will change the value specified in the colValToChange in the row specified by the condition.
  //Result is delivered as a parameter in a designated callback function  
  update: function(colValToChange, condition, cb) {
    orm.update("burgers", colValToChange, condition, function(res) {
      cb(res);
    });
  },

  //calls the delete function in orm.js.
  //Deletes the row from the burger table that is specified in condition 
  delete: function(condition, cb) {
    orm.delete("burgers", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = burgers;