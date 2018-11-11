require('dotenv').load();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');

const orderRouter = require('./lib/orders/orders.router');

const orderDao = require('./lib/orders/orders.dao');
const uuid = require("uuid");


const app = express();

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


app.get('/', async (req, res) => {

    const {id} = req.session;

    // ttl
    const order = await orderDao.findByUserId(id).catch(err => {

        console.error(err);

        return false;
    });


    if (order && order.status) {

        res.sendFile(path.join(__dirname, 'public', 'ttt.html'));

    } else {

        const orderId = uuid.v1();
        res.locals.userId = req.session.id;
        res.locals.orderId = orderId;
        res.render('index');

    }
});

app.use('/orders', orderRouter);


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


