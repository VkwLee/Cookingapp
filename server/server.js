/**
 * Basic setup
 */

const express = require('express');
const pg = require('pg');
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const http = require('http');
const path = require('path');
const reload = require('reload');
const watch = require('watch');
const bodyParser = require('body-parser');
const logger = require('morgan');
const request = require('request');
 
var app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyParser.json()); // Parses json, multi-part (file), url-encoded 
app.use(express.static('../src'));
app.use(logger('dev'));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://food2fork.com/api/search');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(session({
	secret: 'this is a secret',
	resave: false,
	saveUninitialized: false
}));


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
			
	})
	.catch(error => console.error('Could not connect with the database',error));

		

/**
 * Start Routes
 */


app.post('/profile-recipes', function(req,res){
	const users_id = req.body.userId;

	db.query (
		"SELECT * FROM users_recipes AS ur INNER JOIN recipes AS r ON (ur.recipes_id = r.recipes_id) WHERE users_id = $1",[users_id]
	).then(results => {
		let recipeList = [];
		for(let recipe of results.rows) {
			recipeList.push(recipe);
		}
		return recipeList;
	}).then(recipelist => {
		res.status(200);
		res.json(recipelist).end();
	}).catch( error => {
		res.status(500);
		throw error;
	});
});

app.post('/save-recipe', function(req,res){

	console.log('save recipe',req.body);

	const data = {
		users_id	: req.body.user_id,
		fork2food_id: req.body.fork2food_id,
		title		: req.body.title,
		social_rank : req.body.social_rank,
		img			: req.body.img,
		url 		: req.body.url
	};
	
	recipeExist(data.fork2food_id)
	.then(recipeId => {
		if (recipeId) {
			console.log('recipe does exists',recipeId);
			console.log('recipe save with user id',data.users_id);
			db.query (
				"SELECT * FROM users_recipes WHERE (users_id = $1 AND recipes_id = $2)",[data.users_id,recipeId]
			).then( results => {
				if(results.rowCount === 1) {
					console.log('You already saved this recipe!');
					res.status(200);
					res.json({success: "You had already saved this recipe before!", status:200}).end();	
				} else {
					db.query(
						"INSERT INTO users_recipes (users_id, recipes_id) VALUES ($1, $2)",[data.users_id,recipeId]
					).then( success =>{
						res.status(200);
						res.json({success:"Saving recipe on you profile succeeded!",status:200}).end();
					})
				}
			}).catch( error => {
				res.status(500);
				res.json({error: "error fetching pivot table",status:500}).end();
			});
			
		} else {
			console.log('recipe doesn\'t exists');
			db.query ( 
				"INSERT INTO recipes (fork2food_id, title, social_rank, img, url) VALUES ($1, $2, $3, $4, $5)",
				 [data.fork2food_id, data.title, data.social_rank, data.img, data.url]
			).then (function(success) {
				db.query (
					"SELECT recipes_id FROM recipes WHERE fork2food_id=$1",[data.fork2food_id]
				).then( recipes_id => {
					console.log('recipes_id',recipes_id.rows[0]['recipes_id']);
					console.log('users_id',data.users_id);
					db.query (
						"INSERT INTO users_recipes (users_id, recipes_id) VALUES ($1, $2)",[data.users_id,recipes_id.rows[0]['recipes_id']]
					).then(function(success){
						res.status(200);
						res.json({success : "Recipe saved in pivot table", status : 200}).end();
					});
				});
			}).catch(function(error) {
				console.error('failed',error);
				res.status(500);
			    res.json({error : "Failed to save recipe", status : 500}).end();
		    });	   		
			
		}
	})
	.catch(error => { 
		res.status(400);
		res.json({error : 'Could\'t fetch the recipe', status : 400}).end();
	});	

});

app.post('/recipes',function(req,res){

	const API_KEY = '2e8098a7525207c36d8d2d2311d7a858';
    const API_URL = 'http://food2fork.com/api/search?key=';

	request(API_URL + API_KEY + '&q=' + req.body.searchTerm, function (error, response, body) {
		if(error) {
			res.status(500);
			res.json({error : "Failed to find any recipes", status : 500}).end();
		} else {
			res.status(200);
			res.json(body).end();
		}
	});
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
					db.query (
						"SELECT users_id,name FROM users WHERE email=$1",[data.email]
					).then( user => {
						res.status(200);
						res.json(user.rows[0]).end();
					});
				}).catch(function(error) {
					console.error('failed',error);
					res.status(500);
				    res.json({error : "Failed to create new user", status : 500}).end();
			    });	   			
	   		}
		}
	);
		
});

app.post('/login', function(req, res){

	userExist(req.body.email)
	.then(doesExist => {
		if (doesExist) {
			authoriseUser(	
				req.body.email, 
			  	req.body.password,
				function(isMatch, dbUser) {
					console.log('start with authoriseUser password= ',req.body.password);
					console.log(dbUser);
					if(isMatch) {
						console.log('success login',dbUser);
						res.status(200);
						db.query (
							"SELECT users_id,name FROM users WHERE email=$1",[req.body.email]
						).then( user => {
							res.status(200);
							res.json(user.rows[0]).end();
						});
						// res.cookie('userId',matchedUser.id , {
					 //      maxAge: 24 * 60 * 60 * 1000
					 //    });
						// res.render('welcome');
					} else {
						console.log('error login');
						res.status(400);
					    res.json({error : 'login failed password not correct', status : 400}).end();
					}
				}
			);
			
		} else {
			res.status(400);
			res.json({error : 'User doesn\'t exists', status : 400}).end();
		}
	})
	.catch(error => { 
		res.status(400);
		res.json({error : 'Could\'t fetch the user', status : 400}).end();
	});	
});

//this need to be at the bottom so if notthing catch the route this will run
app.get('*', function(req, res) {
  res.render('index');
});

/**
 * Functions
 */

function createUser(email, password, callback){

	console.log('createUser with password= ',password);
	bcrypt.hash(password, null, null, function(err, hash) {
		callback(hash,email);

	});

	return true;
}

function recipeExist(fork2food_id){
	return db.query ( 
		'SELECT recipes_id FROM recipes WHERE fork2food_id=($1)', [fork2food_id]
	).then ( result => {
		console.log('fork2food_id',result.rowCount);
		
		if(result.rowCount === 1 ) {
			return result.rows[0]['recipes_id'];
		} else {
			return false;
		}
	})
	.catch(function(error) {
		console.error('could\'t connect to the recipe database',error);
		// throw error;
    });
}

function userExist(email){
	return db.query ( 
		'SELECT email FROM users WHERE email=($1)', [email]
	).then ( result => {
		console.log('userExist',result.rowCount);
		if(result.rowCount === 1 ) {
			return true;
		} else {
			return false;
		}
	})
	.catch(function(error) {
		console.error('couldn\'t fetch the emails',error);
		throw error;
    });
}

function authoriseUser(email, password, callback) {
	let dbUser = '';
	let self = this;
	db.query ( 
		'SELECT * FROM users WHERE email=($1)', [email]
	).then ( result => {
		dbUser	   = result.rows[0];
		dbUser.password_hash = dbUser.password_hash.trim();
		bcrypt.compare(password, dbUser.password_hash, function(err, isMatch) {
		    callback(isMatch,dbUser);
		    return;
		});
	}).catch(function(error) {
		console.error('failed on authoriseUser',error);
		res.status(500);
	    res.json({error : 'failed on authoriseUser', status : 500}).end();
    });	
}


/**
 * Start server
 */

server.listen(app.get('port'), function () {
  console.log('Web server listening on port ' + app.get('port'))
});

