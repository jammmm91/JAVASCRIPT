let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);

app.get('/test', function(req, res) {
  res.sendfile("practice.html");
});
app.get('/test1', function(req, res) {
  res.sendfile("gugudan.html");
});

//post 할 때 필요한 세줄!
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());


//----------------------여기서부터----------------------
let mysql = require('mysql'); //mysql이라는 모듈을 가져옴
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});
connection.connect();
//--------------------여기까지 한 set--------------------


// connection.query(`select * from news`,
//   function(error, results, fields) {
//     if(error) console.log(error);
//     console.log(results);
//   });

// app.get('/getnews', function(req, res) {
//   res.send("hello world");
//     });
//
// app.get('/practice', function(req, res) {
//   res.sendfile("practice.html");
//     });

app.get('/getNews', function(req, res) {
  connection.query(`select * from news`,
    function(error, results, fields) {
      if (error) console.log(error);
      res.send(results);
    });
});

app.post('/postNews', function(req, res) {
  console.log(req.body.title, req.body.content);
  let title = req.body.title;
  let content = req.body.content;

  connection.query(`insert into news (title, content) values ('${title}', '${content}')`,
    function(error, results, fields) {
      if (error) console.log(error);
      res.send(results);

    });
});
