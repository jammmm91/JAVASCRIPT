let express = require('express');
let http = require('http');
let app = express();
let mysql = require('mysql');
let server = http.createServer(app).listen(80);
app.get('/test', function (req, res) {res.send("hello HO");});
app.get('/testhtml' , function(req, res) {res.sendfile("test.html");});


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});

connection.connect();

  app.get('/test1', function(req, res) {
    res.sendfile("test.html");
  });

  // app.post('/test2', function(req, res) {
  //
  //   connection.query(`SELECT NO, studentNo,
  //   NAME FROM practice where no=${req.query.no}`,
  //   function(error, results, fields) {
  //     res.send(results);
  //   });
  // });

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/news1', function(req, res) {
  connection.query(`INSERT INTO news
(title, content)
VALUES
('${req.body.title}', '${req.body.content.replace("'", "")}')`,
  function(error, result, fields) {
    if(error) {
      console.log(error);
      res.send('not ok');
    }
    else if(result.affectedRows==1) {
      res.send('ok');
    }
  });
});
