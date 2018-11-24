var mysql = require("mysql");
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3001;

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'cfclone'
});

//to connection and show that we have connected
connection.connect(function(error) {

	  if (error) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  }

	  console.log('connected as id ' + connection.threadId);
});

app.get("/", (request, response) =>{

  console.log("We live");

  response.json({
    Main_Page: "You're looking at it"
  });

});



app.get("/departments", (request, response) =>{

  connection.query("SELECT * FROM departments;", function (error, results, fields){

    console.log("We got departments data");
    response.send(results);
  });
});



app.get("/courses", (request, response) =>{

  connection.query("SELECT * FROM courses;", function (error, results, fields){

    console.log("We got courses data");
    response.send(results);
  });
});



app.get("/instructors", (request, response) =>{

  connection.query("SELECT * FROM instructors;", function (error, results, fields){

    console.log("We got instructors data");
    response.send(results);
  });

});

app.get("/days", (request, response) =>{

  connection.query("SELECT * FROM days;", function (error, results, fields){

    console.log("We got days data");
    response.send(results);
  });

});







app.get("/time_slots", (request, response) =>{

  connection.query("SELECT * FROM time_slots;", function (error, results, fields){

    console.log("We got time_slots data");
    response.send(results);
  });

});



app.get("/rooms", (request, response) =>{

  connection.query("SELECT * FROM rooms;", function (error, results, fields){

    console.log("We got rooms data");
    response.send(results);
  });

});





app.get("/sections", (request, response) =>{

  connection.query("SELECT * FROM sections;", function (error, results, fields){

    console.log("We got sections data");
    response.send(results);
  });

});






app.get("/students", (request, response) =>{

  connection.query("SELECT * FROM students;", function (error, results, fields){

    console.log("We got students data");
    response.send(results);
  });

});





app.get("/enrollment", (request, response) =>{

  connection.query("SELECT * FROM enrollment;", function (error, results, fields){

    console.log("We got enrollment data");
    response.send(results);
  });

});





/*
// a route that closes the connection to database: connection.end(); ? 
*/

/*


// a route that opens the connection to database: connection.connect(); ? 
*/


app.listen(PORT, () => {
  console.log(`Issa running on port ${PORT}`);
});



/*
Notes:

*/