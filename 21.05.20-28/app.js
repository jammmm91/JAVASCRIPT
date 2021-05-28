//----------서버만들때 무조건 다 끍어라----------
let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);

//post할 때 필요한 세 줄
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());

//mysql이라는 모듈을 가져옴
let mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});
connection.connect();
//--------------------여기까지--------------------


app.get('/test', function(req, res) {
  res.sendfile("practice.html");
});

app.get('/insertform', function(req, res) {
  res.sendfile("practice1.html");
});

app.delete('/deleteUrl', function(req, res) {
  connection.query(`delete from item where idx = ${req.body.no}`,
    function(error, results, fields) {
      
    });
});

app.get('/list', function(req, res) {
  res.sendfile("practice2.html");
});

//★★★post = body, get = query★★★
app.post('/postPrice', function(req, res) {
  connection.query(`select * from item order by itemPrice`,
    function(error, results, fields) {
      if (error) console.log(error);
      let arr = results
      let money = req.body.money;
      let error1 = "0개"
      for (var i = 0; i < arr.length; i++) {
        let eachItem = arr[i]
        if (money >= eachItem.itemPrice) {
          error1 = eachItem.itemName
        }
      }
      res.send(error1);
    });
});

app.post('/postPrice1', function(req, res) {
  connection.query(`select * from item
      where itemName = '${req.body.item}'
      or itemPrice = ${req.body.price}`,
    function(error, results, fields) {
      if (results.length == 2) {
        res.send('동일한 이름, 가격이 각각 존재합니다(2개)')

      } else if (results.length == 1) {
        // results가 배열의 형태이고 지금 들어오는건 하나의배열이지만
        // 그래도 인덱스를 설정 해줘야 한다고 한다
        if (`${req.body.price}` == results[0].itemPrice &
          `${req.body.item}` == results[0].itemName) {
          res.send('동일한 이름과 가격을 가진 아이템이 존재합니다')
        } else if (`${req.body.item}` == results[0].itemName) {
          res.send('동일한 이름을 가진 아이템이 존재합니다')
        } else if (`${req.body.price}` == results[0].itemPrice) {
          res.send('동일한 가격을 가진 아이템이 존재합니다')
        }
      } else if (results.length == 0) {
        connection.query(`INSERT INTO item
            (itemName, itemPrice) VALUES
      ('${req.body.item}', '${req.body.price}')`,
          function(error, result, fields) {
            if (error) {
              console.log(error);
              res.send('입력오류');
            } else if (result.affectedRows == 1) {
              res.send('겹치는 항목이 없습니다. DB에 저장완료');
            }
          });
      }
    });
});

app.post('/postPrice3', function(req, res) {
  connection.query(`select * from item`,
    function(error, results, fields) {
      if (error) console.log(error);
      let arr = results

      for (var i = 0; i < arr.length; i++) {
        let eachItem = arr[i]
      }
      res.send(arr);
    });
});
