var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var cors = require('cors');
var express = require('express');
var moment = require('moment');
var path = require('path');
var request = require('request');
var mongoose = require('mongoose');

var app = express();

// Connect to the Mongo database
app.set('mongoConnection', process.env.mongoConnection || 'mongodb://localhost/recepten');
mongoose.connect(app.get('mongoConnection'));

app.set('port', process.env.PORT || 3000);

// Enable CORS
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }    ));
app.use(express.static(path.join(__dirname)));

// Include controllers
var recipe = require('./controllers/recipe');
var user = require('./controllers/user');
var category = require('./controllers/category');
var profile = require('./controllers/profile');

// Routing for controllers
app.use('/api/v1/recipe', recipe);
app.use('/api/v1/user', user);
app.use('/api/v1/category', category);
app.use('/api/v1/profile', profile);

// Start the server
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;