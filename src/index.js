import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2a', (req, res) => {
  const sum = (+req.query.a || 0) + (+req.query.b || 0);
  res.send(sum.toString());
});

app.get('/task2b', ( req, res ) => {

  var name = req.query.fullname, aname, matches=[];
  const invalidname = "Invalid fullname";

  if (name == undefined || name == "" || /[0-9_\/]+/g.test(name)){
    name = invalidname;
  }else{
    aname=name.trim().split(" ");

    for(var a in aname){
      if(aname[a].trim() !== ""){
         matches[matches.length]=aname[a].charAt(0).toUpperCase() + aname[a].slice(1).toLowerCase();
      }
    }

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

app.listen(3000, () => {
  console.log('Your app listening on port 3000');
});
