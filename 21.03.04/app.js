let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);
app.get('/test1', function (req, res) {res.send("hello jammmmm");});
app.get('/test2', function (req, res) {res.send("HELLO JAMMMMM91");});
app.get('/testHtml' , function(req, res) {res.sendfile("test.html");});
