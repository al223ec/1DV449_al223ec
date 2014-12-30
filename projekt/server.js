// modules =================================================
var express     	= require('express');
var app         	= express();
var session 		= require('express-session');

var bodyParser     	= require('body-parser');
var cookieParser 	= require('cookie-parser');

var methodOverride 	= require('method-override');

var passport 		= require('passport');
var flash    		= require('connect-flash');

// configuration ===========================================
var db = require('./config/db');
var port = process.env.PORT || 8080; 

// mongoDB
var mongoose   = require('mongoose');
mongoose.connect(db.url); 
var dbConnection = mongoose.connection;

dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function (callback) {
  	console.log('Db connection is up!');
});

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser()); 
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// passport ==================================================
app.use(session({ secret: 'S3CRE7SUCHhaxxor' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

require('./config/passport')(passport); 
// routes ==================================================
require('./app/api_routes')(app, express.Router()); // configure our routes
require('./app/login_routes')(app, express.Router(), passport); 

// start app ===============================================
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;                         
