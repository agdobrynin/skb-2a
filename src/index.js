import express from 'express';
//crossdomain
import cors from 'cors';

const app = express();
app.use(cors());

//выводимое сообщение в случае ошибки
const invalidname = "Invalid fullname";

// index page
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

// task 2a
app.get('/task2a', (req, res) => {
  const sum = (+req.query.a || 0) + (+req.query.b || 0);
  res.send(sum.toString());
});

// task 2b full name validator
app.get('/task2b', ( req, res ) => {

  var name = req.query.fullname, matches=[];

  //проверяем на корректность
  if (name == undefined || name == "" || /[0-9_\/]+/g.test(name)){
    name = invalidname;
  }else{
    //удалим пробелы с начала строки и конца а так же двойные пробелы в строке
    matches=name.trim().replace(/\s{1,}/g," ").split(" ");
    // колличество в имени не более 4х
    switch (matches.length) {
      case 1:
        name =  matches[0].trim();
        break;
      case 2:
        name =  matches[1].trim() + " " + matches[0].slice(0,1) + ".";
        break;
      case 3:
        name = name = matches[2].trim() + " " + matches[0].slice(0,1) + ". " + matches[1].slice(0,1) + ".";
        break;
      default:
        name = invalidname;
    }
  }
  res.send(name);
});

//task 2c get user name from string
app.get('/task2c', (req , res ) => {
  //модуль URL
  const url = require('url');
  // получить из query string по параметру username
  var name = req.query.username.trim(),
      parts;

  //проверяем на корректность
  if (name == undefined || name == ""){
    name = invalidname;
  }else{
    if( /^https?\:/g.test(name) == false ){
      name = "https:" + name;
    }
    parts = url.parse(name, true);
    name = parts.pathname.replace(/@{1,}/g,"").substring(parts.pathname.indexOf("/")+1).replace(/\/(.*)$/g,"");
    name = "@" + name;
  }
  //ответ в браузер
  res.send(name);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000 ...');
});
