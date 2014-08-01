/* jshint camelcase:false */
'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
  res.render('form');
});

app.post('/form', function(req,res){
  var zip = req.body.zip;
  var url = 'http://api.wunderground.com/api/8674e8df3b407733/conditions/q/' + zip + '.json';
  var temp;
  request(url, function(error, response, body){
    body = JSON.parse(body);
    temp = body.current_observation.temp_f;
    temp = temp.toFixed(0) + ' F';
  
    var t = parseInt(temp);
    var color;
    if(t >= 95){
      color = 'red';
    } else if(t <= 94 && t >= 81) {
      color = 'orange';
    } else if(t <= 80 && t >= 71) {
      color = 'yellow';
    } else if(t <= 70 && t >= 33) {
      color = 'green';
    } else if(t <= 32) {
      color = 'blue';
    }

    var height = t * 3;
    console.log(color);
    res.render('weather', {zip:zip, temp:temp, color:color, height:height});
  });
});

var port = process.env.PORT;
app.listen(port, function(){
  console.log('listening on', port);
});
