var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('home');
});

app.get('/get',function(req,res){
  var keyVals = [];
  for (var item in req.query){
    keyVals.push({'key':item,'val':req.query[item]})
  }
  var content = {};
  content.data = keyVals;
  content.callType = "GET";
  res.render('get-or-post', content);
});

app.post('/post', function(req,res){
  var keyVals = [];
  for (var item in req.body){
    keyVals.push({'key':item,'val':req.body[item]})
  }
  console.log(keyVals);
  console.log(req.body);
  var content = {};
  content.data = keyVals;
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
