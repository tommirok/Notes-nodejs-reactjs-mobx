"use strict";
//REQUIRE
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const config = require("./config");
const jwt = require("jsonwebtoken");
const Note = require("./model/notes");
const User = require("./model/user");
const Comment = require("./model/comments");
var app = express();
var router = express.Router();
var Schema = mongoose.Schema;
/**
 *
 * Config
 */
var port = process.env.API_PORT || 3001;
mongoose.connect("mongodb://tommirok:rokolampi2@ds217138.mlab.com:17138/notes");
var db = mongoose.connection;
mongoose.connection.on("error", function(error) {
  console.error("Database connection error:", error);
});
mongoose.connection.once("open", function() {
  console.log("Database connected");
});
app.set("superSecret", config.secret);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//console log requests
app.use(morgan("dev"));
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
//JWT TOKEN

//api polku
app.use("/api", router);

//Server Start
app.listen(port, () => {
  console.log(`api running on port ${port}`);
});

//middleware to Router
router.use((req, res, next) => {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (token) {
    //if it is token, verifys secret and if its expired or not
    jwt.verify(token, app.get("superSecret"), (err, decoded) => {
      if (err) {
        return { success: false, message: "failed to authenticate token." };
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    //no token found
    return res.status(403).send({
      success: false,
      message: "no token provided"
    });
  }
});
//Juuri
router.get("/", (req, res) => {
  res.json({ message: "API inialized" });
});
router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
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
  //SITUATION REGISTER
  if (req.body.username && req.body.password && req.body.passwordConf) {
    var userData = {
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    }; //CREATES USER TO MONGO DB
    User.create(userData, (err, user) => {
      if (err) {
        return res.send(`virhe ${err}`);
      } //GIVES JWT TOKEN TO USER when registered
      console.log(`User added succesfully : ${req}`);
      const payload = {
        sub: user._id,
        name: user.username,
        admin: user.admin
      };
      var token = jwt.sign(payload, app.get("superSecret"));
      console.log(`Login Succeed!: ${req}`);
      res.json({
        success: true,
        message: "heres your token",
        token: token
      });
    });
    //SITUATION LOGIN
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
          //GIVES JWT TOKEN TO USER when logs in
          console.log(`autorisointi alkaa`);
          const payload = {
            sub: user._id,
            name: user.username,
            admin: user.admin
          };
          var token = jwt.sign(payload, app.get("superSecret"));
          console.log(`Login Succeed!: ${req}`);
          res.json({
            success: true,
            message: "heres your token",
            token: token
          });
        }
      }
    );
  } else {
    var error = new Error("All fields required.");
    error.status = 400;
    res.send(`${error}`);
  }
});
