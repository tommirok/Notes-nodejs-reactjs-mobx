"use strict";

var express = require("express");
var session = require("express-session");
var MongoStore = require('connect-mongo')(session);
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

const Note = require("./model/notes");
const User = require("./model/user");
const Comment = require("./model/comments");
var app = express();
var router = express.Router();
var port = process.env.API_PORT || 3001;
var Schema = mongoose.Schema;

//const Note = require('./model/notes');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//MONGO DB
mongoose.connect("mongodb://tommirok:rokolampi2@ds217138.mlab.com:17138/notes");
var db = mongoose.connection;
mongoose.connection.on("error", function(error) {
  console.error("Database connection error:", error);
});

mongoose.connection.once("open", function() {
  console.log("Database connected");
});

//Corssit
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credientals", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, HEAD, OPTIONS, POST, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});
//session
app.use(
  session({
    secret: "pena",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);

//api polku
app.use("/api", router);

//Server Start
app.listen(port, () => {
  console.log(`api running on port ${port}`);
});

//Juuri
router.get("/", (req, res) => {
  res.json({
    message: "API inialized"
  });
});

//GET kaikki notesit
router
  .route("/notes")
  .get((req, res) => {
    Note.find((err, notes) => {
      if (err) res.send(err);
      res.json(notes);
    });
  }) //POST Note alkaa
  .post((req, res) => {
    var note = new Note();
    note.date = req.body.date;
    note.note = req.body.note;
    note.save(err => {
      if (err) res.send(err);
      res.json({ message: "Note added Succesfully!!" });
    });
  });

//COMMENTS Alkaa
router
  .route("/comments")
  .get((req, res) => {
    Comment.find((err, comments) => {
      if (err) res.send(`jotain meni pieleen latauksessa ${err}`);
      res.json(comments);
    });
  })
  .post((req, res) => {
    var comment = new Comment();
    comment.noteId = req.body.noteId;
    comment.name = "Test";
    comment.comment = req.body.comment;

    comment.save(err => {
      if (err) res.send(`jotain meni pieleen lähetyksessä ${err}`);
      res.json({ message: "Comment added Succesfully" });
    });
  });
//USER Alkaaa
router.route("/user").post((req, res) => {
  //JOS Register
  if (req.body.username && req.body.password && req.body.passwordConf) {
    var userData = {
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    };
    User.create(userData, (err, user) => {
      if (err) {
        return res.send(`virhe ${err}`);
      }
      req.session.userId = user._id;
      return res.json({ message: "user added and session is on" });
    });
    //JOS Login
  } else if (req.body.logusername && req.body.logpassword) {
    User.authenticate(
      User,
      req.body.logusername,
      req.body.logpassword,
      (err, user) => {
        if (err || !user) {
          var error = new Error("Wrong email or password");
          error.status = 401;
          res.send(`virhe: ${error}`);
        } else {
          req.session.userId = user._id;
          return res.json({ message: "session is on" });
        }
      }
    );
  } else {
    var error = new Error("All fields required.");
    error.status = 400;
    return next(error);
  }
});
router.route("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/");
      }
    });
  }
});
