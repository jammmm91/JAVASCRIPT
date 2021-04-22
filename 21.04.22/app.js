let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);

app.get('/test', function(req, res) {
  res.sendfile("practice.html");
});
app.get('/test1', function(req, res) {
  res.sendfile("radio.html");
});
app.get('/test2', function(req, res) {
  res.sendfile("radioMulti.html");
});
