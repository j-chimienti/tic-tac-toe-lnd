require('dotenv').load();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const session = require('express-session');

const orderController = require('./order.controller');
const uuid = require("uuid");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
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
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


const appId = process.env.appId;

app.get('/', async (req, res) => {

    const {id} = req.session;

    // ttl
    const order = await orderController.findByUserId(id).catch(err => {

        console.error(err);

        return false;
    });


    if (order && order.status) {

        res.sendFile(path.join(__dirname, 'public', 'ttt.html'));

    } else {

        const orderId = uuid.v1();
        res.locals.userId = req.session.id;
        res.locals.orderId = orderId;
        res.locals.appId = appId;
        res.render('index');

    }
});


app.get('/order/:id', async (req, res, next) => {

    const {id} = req.params;
    const order = await orderController.getOrder(id).catch(err => {

        console.error(err);
        return {status: false};
    });


    if (order && order.status && order.status === 'complete') {

        res.sendFile(path.join(__dirname, 'public', 'ttt.html'));
    } else {

        res.redirect('/');
    }

});


app.post('/notifications/:id/:userId', async (req, res, next) => {


    const {id, userId} = req.params;

    const o = Object.assign({}, req.body, {id, userId});

    await orderController.upsert(o).catch(err => {
        console.error(err);
        return false;
    });

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


