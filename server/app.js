"use strict";
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
hbs = require('hbs');
let config = require('./util/configuration.js');

let routes = require('./routes/notesRoutes');

let app = express();

// view engine setup
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
hbs.registerHelper('multiply', require('./helpers/multiply'));
hbs.registerHelper('if_equal', require('./helpers/conditionals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(function (req, res, next) {
	config.config.styleSwitcher = req.cookies.styleSwitcher;
	config.config.showFinishedActive = req.cookies.showFinishedActive;
	config.config.sortOrder = req.cookies.sortOrder;
	config.config.order = req.cookies.order || 1;
	next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
