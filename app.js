require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const apiKey = process.env.APIKEY;
console.log(process.env.APIKEY);
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

app.post('/whatever-we-want', function(req, res) {
let err = false;

let url = 'http://ronreiter-meme-generator.p.rapidapi.com' + req.body.image + '&units=imperialAPPID=7fc46482fcmshd30f08500e1c439p10f8e3jsnae26ec87a130' + apiKey;

 request(url, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode); 
    console.log('body:', body);
 if(error){
   res.render('home.ejs', {meme: null, error: "Error, please try again"})
 } else {
   let meme = (JSON.parse(body));
    if(meme.main == undefined){
     res.render('home.ejs', {meme: null, error: "Error, please try again"})
   } else {
     let memeImage = "The meme " + req.body.image + " is " + meme.main.image + " degrees.";
     res.render('home.ejs', {meme: memeImage, error: null});
    }
    }
});

});

app.listen(3000, function(){
    console.log('server is live on port: 3000');
});