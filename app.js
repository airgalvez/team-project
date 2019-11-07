require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const apiKey = process.env.APIKEY;
//setting view engine
app.set('view engine', 'ejs');
// middleware
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));
/*
   ROUTES
*/
// GET /

app.get('/', function (req, res) {
 res.render('home.ejs', {meme: null, error: null} );
});

app.post('/', function(req, res) {
  var unirest = require("unirest");

  var req = unirest("GET", "https://ronreiter-meme-generator.p.rapidapi.com/meme");
  
  req.query({
    "font": "Impact",
    "font_size": "50",
    "meme": "Condescending-Wonka",
    "top": "Top text",
    "bottom": "Bottom text"
  });
  
  req.headers({
    "x-rapidapi-host": "ronreiter-meme-generator.p.rapidapi.com",
    "x-rapidapi-key": apiKey
  });
  
  
  // //req.end(function (response) {
  //   if (response.error) throw new Error(response.error);
  //   // console.log(response.body);
  //   res.render('home.ejs', {meme: 'http://apimeme.com/meme?meme=Condescending-Wonka&top=Top+text&bottom=Bottom+text&test=1', error: null} );
  // });

  // //req.end(function (response) {
  //   if (response.error) throw new Error(response.error);
  //   // console.log(response.body);
  //   res.render('home.ejs', {meme: 'http://apimeme.com/meme?meme=Hypnotoad&top=Top+text&bottom=Bottom+text&test=1', error: null} );
  // });

  

});

app.listen(3000, function(){
    console.log('server is live on port: 3000');
});