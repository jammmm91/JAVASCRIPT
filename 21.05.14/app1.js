//서버만들때 무조건 다 끍어라---------------
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
//여기까지--------------------------


app.get('/test1', function(req, res) {
  res.sendfile("practice1.html");
});

app.post('/postPrice', function(req, res) {
  connection.query(`select * from item`,
    function(error, results, fields) {
      if (error) console.log(error);
      let arr = results
      let money = Number(req.body.money);
      console.log(money);
      let error1 = "구입 가능한 상품이 없습니다"
      for (var i = 0; i < arr.length; i++) {
        let eachItem = arr[i]
        // console.log(money, eachItem.itemPrice, money >= eachItem.itemPrice);
        if (money >= eachItem.itemPrice) {
          error1 = eachItem.itemName
        }
      }
      res.send(`${error1}`);
    });
});
