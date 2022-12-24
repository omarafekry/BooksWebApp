var express = require('express');
var path = require('path');
var fs = require('fs');
const { doesNotMatch } = require('assert');
var app = express();
const PORT = process.env.PORT || 3030;
var loggedUser;
var titles = [
{fileName: "flies", title: "Lord of the Flies"},
{fileName: "dune", title: "Dune"},
{fileName: "grapes", title: "The Grapes of Wrath"},
{fileName: "leaves", title: "Leaves of Grass"},
{fileName: "mockingbird", title: "To Kill a Mockingbird"},
{fileName: "sun", title: "The Sun and Her Flowers"}];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('login')
})

app.post('/', function(req, res){
  if (!isCredentialsCorrect(req.body.username, req.body.password)){
    res.status(400).send({
      message: 'Incorrect username or password'
   });
  }
  else{
    //console.log("Logged in");
    loggedUser = req.body.username;
    res.render('home');
  }
})
app.get('/registration', function(req, res){
  res.render('registration');
})
app.post('/registration', function(req, res){
  if (!userFound(req.body.username, req.body.password)){
    var users = Object.values(JSON.parse(fs.readFileSync('users.json')));
    var account = {username: req.body.username, password: req.body.password};
    users.push(account);

    var usersReadList = JSON.parse(fs.readFileSync('usersReadList.json'));
    usersReadList.push({username: req.body.username, readList: []});

    fs.writeFileSync('users.json', JSON.stringify(users));
    fs.writeFileSync('usersReadList.json', JSON.stringify(usersReadList));
    loggedUser = req.body.username;
    res.render('home');
  }
  else{
    res.status(400).send({
      message: 'Username already taken'
   });
  }
})



app.listen(3000);


function addToReadList(title){
  var usersReadList = JSON.parse(fs.readFileSync('usersReadList.json'));
  for(var i = 0; i < usersReadList.length; i++){
    if (usersReadList[i].username == loggedUser){
      var found = false
      usersReadList[i].readList.forEach(item => {
        if (item == title){
          found = true
        }
      });
      if (!found) {
        usersReadList[i].readList.push(title)
      }
      break
    }
  }
  fs.writeFileSync('usersReadList.json', JSON.stringify(usersReadList));
}

function getReadListTitles(){
  var usersReadList = JSON.parse(fs.readFileSync('usersReadList.json'));
  for(var i = 0; i < usersReadList.length; i++){
    if (usersReadList[i].username == loggedUser){
      var matches = []
      usersReadList[i].readList.forEach(likedTitle => {
        titles.forEach(title => {
          if (likedTitle == title.fileName)
          matches.push(title);
        });
      });
      return matches;
    }
  }
}

function userFound(user) {
  var users = JSON.parse(fs.readFileSync('users.json'));
  for(var i = 0; i < users.length; i++){
    if (users[i].username == user){
      return true;
    }
  }
  return false;
}

function isCredentialsCorrect(user, pass){
  var users = JSON.parse(fs.readFileSync('users.json'));
  for(var i = 0; i < users.length; i++){
    //console.log("checking " + users[i].username + " against " + user + " and " + users[i].password + " against " + pass);
    if (users[i].username == user && users[i].password == pass){
      return true;
    }
  }
  return false;
}
app.post('/search', function(req, res){
  
  var matches = [];
  titles.forEach(title => {
    if (title.title.toLowerCase().includes(req.body.Search.toLowerCase())){
      matches.push(title);
   }
  });
  
  res.render('searchresults', {results: matches});
})
app.post('/dune', function(req, res){
  addToReadList(req.path.substring(1))
})
app.post('/flies', function(req, res){
  addToReadList(req.path.substring(1))
})
app.post('/grapes', function(req, res){
  addToReadList(req.path.substring(1))
})
app.post('/leaves', function(req, res){
  addToReadList(req.path.substring(1))
})
app.post('/mockingbird', function(req, res){
  addToReadList(req.path.substring(1))
})
app.post('/sun', function(req, res){
  addToReadList(req.path.substring(1))
})
app.get('/home', function(req, res){
  if (loggedUser != null){
    res.render('home');
  }
  else{
    res.status(400).send({
      message: 'You need to login first'
   });
  }
})
app.get('/dune', function(req, res){
  if (loggedUser != null){
    res.render('dune');
  }
  else{
    res.status(400).send({
      message: 'You need to login first'
   });
  }
})
app.get('/fiction', function(req, res){
  if (loggedUser != null){
    res.render('fiction');
  }
  else{
    res.status(400).send({
      message: 'You need to login first'
   });
  }
})
app.get('/flies', function(req, res){
  if (loggedUser != null){
    res.render('flies');
  }
  else{
    res.status(400).send({
      message: 'You need to login first'
   });
  }
})
app.get('/grapes', function(req, res){
  if (loggedUser != null){
    res.render('grapes');
  }
  else{
    res.status(400).send({
      message: 'You need to login first'
   });
  }
})
app.get('/leaves', function(req, res){
  if (loggedUser != null){
    res.render('leaves');
  }
  else{
    res.status(400).send({
      message: 'You need to login first'
   });
  }
})
app.get('/mockingbird', function(req, res){
  if (loggedUser != null){
    res.render('mockingbird');
  }
  else{
    res.status(400).send({
      message: 'You need to login first'
   });
  }
})
app.get('/novel', function(req, res){
  if (loggedUser != null){
    res.render('novel');
  }
  else{
    res.status(400).send({
      message: 'You need to login first'
   });
  }
})
app.get('/poetry', function(req, res){
  if (loggedUser != null){
    res.render('poetry');
  }
  else{
    res.status(400).send({
      message: 'You need to login first'
   });
  }
})
app.get('/readlist', function(req, res){
  if (loggedUser != null){
    res.render('readlist', {results: getReadListTitles()});
  }
  else{
    res.status(400).send({
      message: 'You need to login first'
   });
  }
})
app.get('/searchresults', function(req, res){
  if (loggedUser != null){
    res.render('searchresults');
  }
  else{
    res.status(400).send({
      message: 'You need to login first'
   });
  }
})
app.get('/sun', function(req, res){
  if (loggedUser != null){
    res.render('sun');
  }
  else{
    res.status(400).send({
      message: 'You need to login first'
   });
  }
})
