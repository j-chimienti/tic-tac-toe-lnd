require('dotenv').load();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const port = process.env.PORT || 3000;
var parseurl = require('parseurl');
const fs = require('fs');


var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


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

    const orderId = uuidv4();
    res.locals.orderId = orderId;
    res.locals.appId = appId;
    res.render('index');

});

app.get('/order/:id', (req, res, next) => {

    const {id} = req.params;
    res.render('order', {orderId: id, status: 'pending'});

});

app.post('/notifications/:id', (req, res, next) => {


    // verify!!!

    const {id} = req.params;

    fs.writeFileSync('./data.json', JSON.stringify(req.body));

    io.to(id).emit('orderSuccess', {success: true, order: {very: 'nice'}});
    res.sendStatus(200);
});




io.on('connection', onConnection);


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

http.listen(port, () => console.log('listening on port ' + port));

module.exports = app;



function onConnection(socket) {

    socket.on('initOrder', (orderId) => {

        socket.join(orderId);
    });


}


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
