var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var indexRouter = require('./routes/index');

var app = express();

//app.use(bodyParser.urlencoded({ extended:false}));
app.locals.tiles = {};
const BC = require('./BC')
app.locals.BC = BC;

// view engine setup
//app.set('view engine', 'ejs');
//app.engine('ejs', ejs.renderFile);
//app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

//app.use('/data/:id', express.static(__dirname+'/public/3'));
app.use('/data/:id', (req, res, next) => {
  var id = req.params.id; // <-- programmatically update url yourself
  console.log(id);
  express.static(__dirname + '/public/'+id)(req, res, next);
});  


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
