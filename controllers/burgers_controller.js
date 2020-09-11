var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create([
    "burger_name"]
  , [
    req.body.burger_name
  ], function(result) {
    console.log("Working?");
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
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

  burger.delete(condition, function(result) {
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




// * Express
// * `burger.js`

// 4. Create the `router` for the app, and export the `router` at the end of your file.
//router connections go here for managing database arrays and identifying endpoints

// var express = require ("express");
// var burger = requiree ("../models/burger");

// var router = express.Router();

// router.get("/", function (req, res) {
//     //burger is going to call the all function on the model //all is in the burger.js//all function calls the all function in orm//passes "burgers" into orm.js//then there is stream of callbacks from orm to cat to catsController
//     burger.all(function(data) {
//         var hbsObj = {
//             burgers: data
//         };
//         hbsObj.burgers.map((burger)=>burger.devoured)

//         console.log(hbsObj);
//         res.render("index", hbsObj);
//     });

// router.post("/api/burgers", function (req, res) {
//         burger.insertOne (
//             ["burger_name", "devoured"],
//             [req.body.burger_name, req.body,devoured],
//             function(result) {
//                 //send back the ID of new burger
//                 res.json({ id: result.insertId });
//             }
//         );
//     });
//     router.put("/api/burgers/:id", function(req, res){
//         var condition = "id = " + req.params.id;
//         console.log("condition", condition);
//         burger.updateOne({ devoured: req.body.devoured }, condition, function(result) {
//             if (result, changedRows === 0 ) {
//                 return res.status(404).end();
//             } else {
//                 res.status(200).end();
//             }
//         });

//     router.deleteOne(condition, function(req,res){
//         var condition = "id = " + req.params.id;
//         console.log("condition", condition);

//         burger.deleteOne(condition, function(result){
//             if (result, changedRows === 0 ) {
//                 return res.status(404).end();
//             } else {
//                 res.status(200).end();
//             }
// });
// module.exports = router; 