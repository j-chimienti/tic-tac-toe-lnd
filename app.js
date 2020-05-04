require('dotenv').load();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');

const orderRouter = require('./lib/orders/orders.router');

const {BTCPAY_HOST, BTCPAY_STORE_ID, CALLBACK_HOST} = process.env;

const app = express();
app.locals.btcpay_host = BTCPAY_HOST
app.locals.btcpay_store_id = BTCPAY_STORE_ID
app.locals.callback_host = CALLBACK_HOST
app.locals.choiceKey = process.env.choiceKey

app.locals.title = 'Lighting STORE!'


// view engine setup
app.set('views', path.join(__dirname, 'views'));

// app.engine( 'hbs', hbs( {
//     extname: 'hbs',
//     //defaultLayout: 'main',
//     //layoutsDir: __dirname + '/views/layouts/',
//     partialsDir: __dirname + '/views/partials/'
// } ) );

app.set('view engine', 'hbs');

const MongoStore = require('connect-mongo')(session);


app.use(session({
    store: new MongoStore({url: process.env.MONGO_URI}),
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 3600000 // 1 hr
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(sassMiddleware({
//     src: path.join(__dirname, 'public'),
//     dest: path.join(__dirname, 'public'),
//     indentedSyntax: true, // true = .sass and false = .scss
//     sourceMap: true
// }));

app.get('/', (req, res) => res.redirect('/orders/homepage/init'))

app.use('/orders', orderRouter);

app.use(express.static(path.join(__dirname, 'build')));
// fixme: ensure session exists before sending file
app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;


