//Imports express npm
const express = require('express');

//calls the express.router method
const router = express.Router();

//imports the burgers model to interact with burgers table in burger database
const burgers = require('../models/burger.js');

//Grabs all the data from burgers data for "/index" route and renders it to the index.html view handlebars
router.get("/", function (req,res) {
    burgers.all(function(data){
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
    res.render("index", hbsObject);
    });
});

//Will take the newly created burger and send it to the database based on the specifed route
router.post("/api/burgers", function (req, res) {
    console.log(req.body);
    burgers.create (["name", "eaten", "vomit_amt"], [req.body.name, req.body.eaten, req.body.vomit_amt], function (result){

        //send back the id
        res.json({ id: result.inserId})
    });
});

router.put("/api/burgers/:id", function(req, res) {
    const condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  console.log(req.body);

    burgers.update({
      eaten: req.body.eaten
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    burgers.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  // Export routes for server.js to use.
  module.exports = router;
  