var mysql = require('mysql');
var express = require("express");
var app = express();

var PORT = process.env.PORT || 3001;

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'cfclone'
});

//--------------vvvvvv[mysql stuff]vvvvvvvv------------------
// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

// connection.end()
//--------------^^^^^^[mysql stuff]^^^^^^^^------------------


app.get("/", (request, response) =>{

	/*
		insert database connection test here, first we need to create the tables
	*/

	response.json({
		example: "this is the example"
	});



});


app.listen(PORT, () => {
  console.log(`Issa running on port ${PORT}`);
});
