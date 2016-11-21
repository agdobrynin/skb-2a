import express from 'express';
//crossdomain
import cors from 'cors';
//lodash libs
import _ from 'lodash';

//my libs
import canonizename from './canonizename.js';

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
  //функция из либы canonizename.js
  res.send(canonizename(req.query.username));
});

//task 2d Распознать цвет и привести его к #abcdef виду
//Клиент выполняет GET запрос с параметром Query:
//?color= и присылает цвета в разных форматах.
//Red, #ff0000, rgb(255, 0, 0), hsl(0, 100%, 50%)
//Задача: привести все цвета к виду HEX виду в нижнем регистре: #123abc
app.get('/task2d', (req , res ) => {

  let color_check = require('./color_check.js'),
      result=false;
  const InvalidColor='Invalid color';

  try{
    result = color_check(req.query.color);
  }catch(e){
    console.log(e);
  }
  res.send( result===false?InvalidColor:result );
  
});

app.listen(3001, () => {
  console.log('Your app listening on port 3001 ...');
});
