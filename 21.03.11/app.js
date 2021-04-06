let express = require('express');
let http = require('http');
let app = express();

let mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});

connection.connect();

//80번 포트에서 서버 리퀘스 리스닝
let server = http.createServer(app).listen(80);
//메인 주소로 리퀘스트를 받아서 practice1이라는 텍스트를 응답으로 주는 라우
app.get('/test1', function(req, res) {
  res.sendfile("practice1.html");
});
app.get('/test2', function(req, res) {
  res.sendfile("practice2.html");
});
app.get('/test3', function(req, res) {
  res.sendfile("practice3.html");
});
app.get('/test4', function(req, res) {
  res.sendfile("practice4.html");
});
app.get('/test5', function(req, res) {
  res.sendfile("table.html");
});
app.get('/test6', function(req, res) {
  res.sendfile("css.html");
});

app.get('/test7', function(req, res) {
  connection.query(`SELECT NO, studentNo,
NAME, age FROM student
WHERE NO <= 38 AND NO >=1`, function(error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.send(results)
  });
});
