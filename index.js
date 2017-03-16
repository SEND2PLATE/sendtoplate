

global.__root = __dirname + '/';

//                  Modules

var express = require('express');
var app = express();
var session = require('cookie-session');
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var fs = require('fs');

var ig = require('instagram-node').instagram();
var events = require("events");

var basicAuth = require('basic-auth-connect');
var request = require("request");


var publicFolder = __dirname + '/site/';





//                  Express.JS Routage  


app.use(session({
    secret: 'todotopsecret'
}))
app.use('/', express.static(__dirname + "/Site"));
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);

var router = express.Router();

app.use('/api/', router);


var routes = ['user'];

for (var i = 0; i < routes.length; ++i) {
    require(__dirname + '/controller/' + routes[i])(router);
}


app.listen(process.env.PORT || 8002);
