// Heroku will define the port number in process.env.PORT
const PORT = process.env.PORT || 3000;

// Init
var express = require("express");
var app = express();
app.use(express.static('frontend'));
// Starts listening	
app.listen(PORT, function () {
	console.log('App listening on port ' + PORT)
});
