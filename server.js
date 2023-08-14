const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const loginRouter = require('./routes/login.js');


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

// 주어진 폴더의 절대경로를 가상 경로로 접근 가능하게 함
// 디렉터리 하위 파일들까지 적용됨
app.use('/html', express.static(__dirname + '/html'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

const query = require('./lib/query.js');
let q = new query();
const passport = require('./lib/passport.js')(app, q);
const processRouter = require('./routes/process.js')(passport, q);

app.use('/login', loginRouter);
app.use('/process', processRouter);

app.get('/', (request, response) => {
    response.redirect('/login');    
});

app.listen(3000);
