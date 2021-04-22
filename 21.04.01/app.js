let express = require('express');
let http = require('http');
let app = express();
// let mysql = require('mysql');
let server = http.createServer(app).listen(80);

app.get('/test', function(req, res) {
  res.sendfile("practice.html");
});
app.get('/test2', function(req, res) {
  res.sendfile("star.html");
});
app.get('/test3', function(req, res) {
  res.sendfile("practice3.html");
});

//
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'test'
// });
//
// connection.connect();
