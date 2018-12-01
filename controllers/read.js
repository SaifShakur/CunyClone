const express = require('express');
var mysql = require("mysql");
const router = express.Router();
const keys = require("../config/keys")
bodyParser = require('body-parser').json();

var connection = mysql.createConnection({
  host: keys.mysql.host,
  user: keys.mysql.user,
  password: keys.mysql.password,
  database: keys.mysql.database
});

connection.connect(function (error) {
  if (error) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

//-------------------------------------------------------------

router.get("/", (request, response) => {

  console.log("We live");

  response.json({
    Main_Page: "You're looking at it"
  });

});

router.get("/departments", (request, response) => {

  connection.query("SELECT * FROM departments;",
    function (error, results, fields) {
      console.log("We got departments data");
      response.json(results);
    });
});

router.get("/courses", (request, response) => {
  connection.query("SELECT * FROM courses;",
    function (error, results, fields) {

      console.log("We got courses data");
      response.json(results);
    });
});

router.get("/instructors", (request, response) => {
  connection.query("SELECT * FROM instructors;",
    function (error, results, fields) {

      console.log("We got instructors data");
      response.json(results);
    });

});

router.get("/days", (request, response) => {
  connection.query("SELECT * FROM days;",
    function (error, results, fields) {

      console.log("We got days data");
      response.json(results);
    });

});

router.get("/time_slots", (request, response) => {
  connection.query("SELECT * FROM time_slots;",
    function (error, results, fields) {

      console.log("We got time_slots data");
      response.json(results);
    });

});

router.get("/rooms", (request, response) => {
  connection.query("SELECT * FROM rooms;",
    function (error, results, fields) {

      console.log("We got rooms data");
      response.json(results);
    });

});


router.get("/sections", (request, response) => {
  connection.query("SELECT * FROM sections;", 
    function (error, results, fields) {

    console.log("We got sections data");
    response.json(results);
  });
});

router.get("/students", (request, response) => {

  connection.query("SELECT * FROM students;", 
    function (error, results, fields) {

    console.log("We got students data");
    response.json(results);
  });
});

router.get("/enrollment", (request, response) => {
  connection.query("SELECT * FROM enrollment;", 
    function (error, results, fields) {

    console.log("We got enrollment data");
    response.json(results);
  });

});

module.exports = router;