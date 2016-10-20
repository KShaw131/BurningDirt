// set up ======================================================================
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;

// configuration ===============================================================

mongoose.connect('mongodb://localhost/blogs1'); 	// connect to mongoDB database

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images/whipLogo.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// application -------------------------------------------------------------
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// listen (start app with node app.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

// define model ================================================================
var Blog = mongoose.model('Blog', {
  title: String,
  series: String,
  content: String,
  image: String
});

// routes ======================================================================

	// api ---------------------------------------------------------------------
	// GET ALL blogs
	app.get('/api/blogs', function(req, res) {
		// use mongoose to get all blogs in the database
		Blog.find(function(err, blogs) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
        res.send(err);
			res.send(blogs); // return all blogs in JSON format
		});
	});

	// CREATE blog and send back all blogs after creation
	app.post('/api/blogs', function(req, res) {
		// create a blog, information comes from AJAX request from Angular
		Blog.create({
			title : req.body.title,
      series: req.body.series,
      content: req.body.content,
      image: req.body.image

		}, function(err, blog) {
			if (err)
				res.send(err);

			// get and return all the blogs after you create another
			Blog.find(function(err, blogs) {
        if (err){
          res.send(err)
        }else
  			   res.send(blogs); // return all blogs
			});
		});

	});

	// DELETE a blog
	app.delete('/api/blogs/:blog_id', function(req, res) {
		Blog.remove({
			_id : req.params.blog_id
		}, function(err, blog) {
			if (err)
				res.send(err);

			// get and return all the blogs after you create another
			Blog.find(function(err, blogs) {
				if (err)
					res.send(err)
				res.send(blogs);
			});
		});
	});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
