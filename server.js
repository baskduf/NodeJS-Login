const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const loginRouter = require('./routes/login.js');
const processRouter = require('./routes/process.js');

const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'login_user'
};

const sessionStore = new MySQLStore(options);

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))



app.use('/login', loginRouter);
app.use('/process', processRouter);

app.get('/', (request, response) => {
    response.redirect('/login');    
});

app.listen(3000);
