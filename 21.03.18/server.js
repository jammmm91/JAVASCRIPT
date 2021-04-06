let express = require('express');
let http = require('http');
let app = express();
let mysql = require('mysql');
let server = http.createServer(app).listen(80);

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});

connection.connect();

// app.get('/order', function(req, res) {
//   //주문을 읽어오는 로직
// });
//
// app.put('/order', function(req, res) {
//   //주문을 수정하는 로직
// });
//
// app.post('/order', function(req, res) {
//   //주문을 생성하는 로직
// });
//
// app.delete('/order', function(req, res) {
//   //주문을 삭제허는 로직
// });

app.get('/practice1', function(req, res) {
  res.sendfile("practice1.html");
});

app.get('/test1', function(req, res) {

  connection.query(`SELECT NO, studentNo,
  NAME FROM practice where no=${req.query.no}`,
  function(error, results, fields) {
    res.send(results)
  });
});
