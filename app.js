const env = require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiKey = process.env.API_KEY;
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(function() {
    console.log("Connected to database");
  })
  .catch(function(err) {
    console.log("Error connecting to db \n${err}");
  });

const FactSchema = new mongoose.Schema({
  factId: Number,
  factText: String,
  factCategory: String
});

const Fact = mongoose.model("Fact", FactSchema);


app.get("/randomfact/:key", function(req, res) {
  let userKey = req.params.key;
  if(userKey !== apiKey) {
    res.send("Error retrieving data");
  }
  else {
    Fact
    .findOne({})
    .sort('-factId')
    .exec(function(err, result) {
      let maxId = result.factId;
      let randomId = Math.floor(Math.random() * (maxId  + 1));

      Fact.findOne({factId: randomId}, function(error, fact) {
        if(error) {
          res.send("Error retrieving fact :(");
        }
        else {
          res.send(fact.factText);
        }
      });
    });
  }
});

app.listen(process.env.PORT, function() {
  console.log("Server is listening.");
});
