require('dotenv').load();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const session = require('express-session');

const orderController = require('./order.controller');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

const appId = process.env.appId;

app.get('/', (req, res) => {

    const orderId = req.session.id;
    res.locals.orderId = orderId;
    res.locals.appId = appId;
    res.render('index');

});

app.get('/order/:id', async (req, res, next) => {

    const {id} = req.params;
    const order = await orderController.getOrder(id);


    console.log('order', order);

    let status = order ? order.status : 'pending';

    res.render('order', {status, orderId: id, order});

});

app.post('/notifications/:id', async (req, res, next) => {


    const {id} = req.params;
    console.log('status', req.body.status);

    const result = await orderController.upsert(req.body);

    res.sendStatus(200);
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


