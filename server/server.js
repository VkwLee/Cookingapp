/**
 * Basic setup
 */

const express = require('express')
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
app.use(cookieParser());

app.set('view engine', 'pug');
 
app.use(express.static('../src'));
 
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));

app.use(bodyParser.json()); // Parses json, multi-part (file), url-encoded 
 
app.get('/', function(req, res) {
	res.render('index');
});
 
var server = http.createServer(app);
 
// Reload code here 

reloadServer = reload(app);
watch.watchTree('../src/js', function (f, curr, prev) {
    // Fire server-side reload event 
    reloadServer.reload();
});
 




/**
 * Start Routes
 */


app.post('/login', function(req, res){
	authoriseUser(	req.body.email, 
				  	req.body.password,
					function(isMatch,matchedUser) {
						if(isMatch) {
							res.cookie('userId',matchedUser.id , {
						      maxAge: 24 * 60 * 60 * 1000
						    });
							res.render('welcome');
						} else {
							res.render('loginForm');
						}
					}
	)	
});

// server.post('/new-user', function(req, res){
// 	if (!userExist(req.body.email)) {
// 		if (createUser(req.body.email,
// 					   req.body.password,
// 					   req.body.confirmPassword,
// 					   function(hash,email){
// 					   		if(hash && email){
// 					   			let user = {'email':email,'password': hash, 'id':g_users.length};
// 							    g_users.push(user);
// 							    console.log('g_users post/',g_users);
// 					   		}
// 						}
// 					)
// 			)
// 		{	
// 			res.render('loginForm');
// 		} else {
// 			res.render('registrationForm');
// 		}
// 	}
// 	else {
// 		res.render('loginForm');
// 	}
// });


/**
 * Start functions
 */

const g_users = [];

function authoriseUser(email, password, callback) {
	let matchedUser = null;
	for(const user of g_users){
		if (user.email === email) {
			matchedUser = user;
			break;
		}
	}
	if (matchedUser === null) {
		callback(false);
		return;
	}
	bcrypt.compare(password, matchedUser.password, function(err, isMatch) {
	    callback(isMatch,matchedUser);
	    return;
	});
}

function userExist(email){
	for(const user of g_users){
		if (user.email === email ){
			return true;
		}
	}
	return false;
}

function createUser(email, password, confirmation, callback){
	if (confirmation === password) {
		//let user = {'email':email,'password':''};

		bcrypt.hash(password, null, null, function(err, hash) {
			callback(hash,email);
		});
		return true;
	} else {
		return false;
	}
}


/**
 * Start server
 */

server.listen(app.get('port'), function () {
  console.log('Web server listening on port ' + app.get('port'))
});

