require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const apiKey = process.env.APIKEY;
//setting view engine
app.set("view engine", "ejs");
// middleware
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
/*
   ROUTES
*/
// GET /

app.get("/", function(req, res) {
  res.render("home.ejs", { images: null, meme: null, error: null });
});

app.post("/", function(req, res) {
  var options = {
    method: "GET",
    url: "https://api.imgflip.com/get_memes"
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    let userMeme = JSON.parse(body).data.memes;
    console.log(userMeme);
    res.render("home.ejs", { images: userMeme, meme: null, error: null });
  });
});

app.listen(3000, function() {
  console.log("server is live on port: 3000");
});
