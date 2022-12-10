var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('flies')
})

if(process.env.PORT){
  app.listen(process.env.PORT, function(){console.log('Server started')});
}
else{
  app.listen(3000, function(){console.log('Server started on port 3000')});
}