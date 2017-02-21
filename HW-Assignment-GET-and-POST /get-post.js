// location of live website http://flip3.engr.oregonstate.edu:3948

var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3948);

// when the users goes to the home page, they are served home.handlebars
app.get('/',function(req,res){
  res.render('home');
});

// when the user makes a get request, an array stores all the
// items in the query
app.get('/get',function(req,res){
  var keyValsQ = [];
  for (var item in req.query){
    keyValsQ.push({'key':item,'val':req.query[item]})
  }

  // the array of items is put into an object
  var content = {};
  content.Qdata = keyValsQ;

  // a call type is indicated
  content.callType = "GET";

  // get-post.handlebars is served
  res.render('get-or-post', content);
});

// when the user makes a post request, an array stores all the
// items in the body
app.post('/post', function(req,res){
  var keyValsB = [];
  for (var item in req.body){
    keyValsB.push({'key':item,'val':req.body[item]})
  }

// when the user makes a post request, an array stores all the
// items in the query
  var keyValsQ = [];
  for (var item in req.query){
    keyValsQ.push({'key':item,'val':req.query[item]})
  }
  
  console.log(req.body);
  console.log(req.query);
  var content = {};
  content.Bdata = keyValsB;
  content.Qdata = keyValsQ;
  content.callType = "POST";
  res.render('get-or-post', content);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
