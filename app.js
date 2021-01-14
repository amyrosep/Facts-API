const express = require("express");
const app = express();
const https = require("https");
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

const baseUrl = "https://catfact.ninja/fact?";
const maxLength = 399;

app.get("/", function(req, res) {
  let fullApiUrl = baseUrl + "max_length=" + maxLength;
  https.get(fullApiUrl, function(response) {
    response.on("data", function(data) {
      let catFact = JSON.parse(data);
      res.send(catFact.fact);
    });
  });
});

app.listen(3000, function() {
  console.log("Server is listening.");
});
