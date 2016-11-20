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

  let color = require('onecolor'), answer;
  const InvalidColor='Invalid color';

  if(req.query.color !== undefined){

    let mycolor = unescape(req.query.color.trim().toLowerCase()),
    channelRegExp = /\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*/,
    alphaChannelRegExp = /\s*(\.\d+|\d+(?:\.\d+)?)\s*/,
    cssRegExp = new RegExp(
                         '^(rgb|hsl|hsv)a?' +
                         '\\(' +
                             channelRegExp.source + ',' +
                             channelRegExp.source + ',' +
                             channelRegExp.source +
                             '(?:,' + alphaChannelRegExp.source + ')?' +
                         '\\)$', 'i');

    let matchCssSyntax = mycolor.match(cssRegExp);

    console.log(matchCssSyntax, mycolor);

    if( matchCssSyntax !== null ){
      if( matchCssSyntax[1]=='rgb' && (matchCssSyntax[2] > 255 || matchCssSyntax[4] > 255 || matchCssSyntax[6] > 255 || matchCssSyntax[8] !==undefined) ){
        mycolor=false;
      }else if(matchCssSyntax[1]=='hsl' && (
            (parseInt(matchCssSyntax[4]) > 100 || matchCssSyntax[5]==undefined )
            ||
            (parseInt(matchCssSyntax[6]) > 100 || matchCssSyntax[7]==undefined )
          )
        ){
        mycolor=false;
      }else{
        mycolor = color(mycolor);
      }
    }else{
      mycolor = color(mycolor);
    }

    if ( mycolor === false )
      answer=InvalidColor;
    else
      answer=mycolor.hex();
  }else{
    answer=InvalidColor;
  }
  return res.send(answer);
});

app.listen(3001, () => {
  console.log('Your app listening on port 3001 ...');
});
