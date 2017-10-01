/**
 * Basic setup
 */

const express = require('express');
const pg = require('pg');
const bcrypt = require('bcrypt-nodejs');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const http = require('http');
const path = require('path');
const reload = require('reload');
const watch = require('watch');
const bodyParser = require('body-parser');
const logger = require('morgan');
 
var app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyParser.json()); // Parses json, multi-part (file), url-encoded 
app.use(express.static('../src'));
app.use(logger('dev'));
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);
 
var server = http.createServer(app);
 
/**
 * Reload when changes are made
 */

reloadServer = reload(app);
watch.watchTree('../src/js', function (f, curr, prev) {
    // Fire server-side reload event 
    reloadServer.reload();
});
 
/**
 * Setting up database connection
 */

const db = new pg.Pool({
	user: 'victorkgongwoeilee',
	host: 'localhost',
	database: 'cookingapp',
	password: ''
});

db.connect()
	.then( clientDB => {
		clientDB.query( "SELECT * FROM users")
			.then (userResult => {
				clientDB.release();
				console.log(userResult);	
			})

			.catch(error => {
				clientDB.release();
				console.error('couldn\'t get users',error.stack);
			});

			
	})
	.catch(error => console.error('Could not connect with the database',error));

		

/**
 * Start Routes
 */
app.get('*', function(req, res) {
  res.render('index');
});

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/new-user', function(req, res) {
	const data = {
		name: req.body.name,
		email: req.body.email,
		password_hash: ''
	};

	createUser (
		req.body.email,
		req.body.password,
		function(hash,email) {

	   		if(hash && email) {

	   			data.password_hash = hash;

   				db.query ( 
					"INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)",
					 [data.name,data.email,data.password_hash]
				).then (function(success) {
					console.log('success');
				    res.json({success : "Create new user succeeded", status : 200});
				}).catch(function(error) {
					console.error('failed',error);
					res.status(500);
				    res.json({error : "Failed to create new user", status : 500});
			    });	   			
	   		}
		}
	);
		
});

app.post('/login', function(req, res){
	// let self = this;
	if(!userExist(req.body.email)){
		console.log('before authoriseUser password= ', req.body.password);
		authoriseUser(	
			req.body.email, 
		  	req.body.password,
			function(isMatch, dbUser) {
				console.log('start with authoriseUser password= ',req.body.password);
				console.log(dbUser);
				if(isMatch) {
					console.log('success login',dbUser);
				    res.json({success : "login succeeded", status : 200});
					// res.cookie('userId',matchedUser.id , {
				 //      maxAge: 24 * 60 * 60 * 1000
				 //    });
					// res.render('welcome');
				} else {
					console.log('error login');
					res.status(400);
				    res.json({error : "login failed password not correct", status : 400});
				}
			}
		)	
	}	
});

/**
 * Start functions
 */

function authoriseUser(email, password, callback) {
	let dbUser = '';

	let self = this;

	db.query ( 
		"SELECT * FROM users WHERE email=($1)", [email]
	).then ( result => {
		console.log('password ',password);
		dbUser	   = result.rows[0];
		console.log('authoriseUser dbUser.password_hash= ', dbUser.password_hash);
		bcrypt.compare(password, dbUser.password_hash, function(err, isMatch) {
			console.log('bcrypt compare= ', isMatch);
			console.log('bcrypt compare error= ', err);
		    callback(isMatch,dbUser);
		    return;
		});
	}).catch(function(error) {
		console.error('user exists failed',error);
		res.status(500);
	    res.json({error : "fetch login failed", status : 500});
    });	
}

function userExist(email){
	db.query ( 
		"SELECT email FROM users WHERE email=($1)", [email]
	).then ( result => {

		if(result.rowCount > 0 && email === result.rows[0].email ) {
			console.log('user exists!');
			return true;
		} else {
			res.json({error : "fetch login failed user doesn\'t exists", status : 400});
			return false;
		}
	}).catch(function(error) {
		console.error('user exists failed',error);
		res.status(500);
	    res.json({error : "fetch login failed", status : 500});
    });	
}

function createUser(email, password, callback){

	console.log('createUser with password= ',password);
	bcrypt.hash(password, null, null, function(err, hash) {
		callback(hash,email);

	});

	return true;
}


/**
 * Start server
 */

server.listen(app.get('port'), function () {
  console.log('Web server listening on port ' + app.get('port'))
});

