//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");
//TODO

//Schema
const ArticialSchema = {
  title: String,
  content: String,
};

//Collections
const Article = mongoose.model("articles", ArticialSchema);

app
  .route("/articles")

  .get(function (req, res) {
    Article.find({}, function (err, found) {
      if (!err) {
        res.send(found);
      } else {
        console.log(err);
      }
    });
  })

  .post(function (req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save(function (err) {
      if (!err) {
        res.send("article added");
      } else {
        console.log(err);
      }
    });
  })
  
//
  .delete(function (req, res) {
    Article.deleteMany({}, function (err) {
      if (!err) {
        res.send("Sucesfully Deleted All");
      } else {
        console.log(err);
      }
    });
  });

// Another Route for another activities- :


//Find Specific Data from - Database

  app.route("/articles/title/:titleid")
  .get(function(req,res){
    const titlename = req.params.titleid;

    Article.findOne({title : titlename}, function(err, found){
        if(!err){
            res.send(found);
        }
        else{
            console.log(err);
        }
    })
  })

// Update items form database  
  .put(function(req,res){
    const titlename = req.params.titleid;
    Article.updateOne({title: titlename}, {title: req.body.title, content: req.body.content}, function(err){
      if(!err){
        res.send("Sucessfuly Updated");
      }
      else{
        console.log(err);
      }
    })
  })


  // Delete One -> item from database
  .delete(function(req,res){
    const titlename = req.params.titleid;
    Article.deleteOne({title: titlename}, function(err){
      if(!err){
        res.send("Sucessfully Deleted");
      }
      else{
        console.log(err);
      }
    })
  })

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
