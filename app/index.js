'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));

//app.get('/', function(req,res){
  //res.render('______');
//});

var port = process.env.PORT;
app.listen(port, function(){
  console.log('listening on', port);
});
