const express = require('express');

const router = express.Router();


// -----------------------------------
router.get("/", (request, response) =>{

  console.log("We live");

  response.json({
    Main_Page: "You're looking at it"
  });

});

router.get("/select", (request, response) =>{

  connection.query("SELECT * FROM departments;", function (error, results, fields){

    console.log("We got departments data");
    response.send(results);
  });

});

module.exports = router;