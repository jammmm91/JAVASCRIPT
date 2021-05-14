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

app.get('/postPrice', function(req,res) {
  let money = Number(req.query.money);
  let arr =[{name:"item1 구입가능합니다",price:1000},
            {name:"item2 구입가능합니다",price:5000},
            {name:"item3 구입가능합니다",price:10000},
            {name:"item4 구입가능합니다",price:30000},
            {name:"item5 구입가능합니다",price:50000},
            {name:"item6 구입가능합니다",price:100000},
            {name:"item7 구입가능합니다",price:500000}]
  let error = "구입 가능한 상품이 없습니다"
  for (var i = 0; i < arr.length; i++) {
    let eachItem = arr[i]
    if (money >= eachItem.price) {
      error = eachItem.name
    }
  }
  res.send(`${error}`);
})
