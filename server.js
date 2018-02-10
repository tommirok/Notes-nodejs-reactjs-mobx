'use strict'
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
const Note = require('./model/notes');
const User = require('./model/users');
const Comment = require('./model/comments');
var router = express.Router();
var port = process.env.API_PORT || 3001;
var Schema = mongoose.Schema;


//const Note = require('./model/notes');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//MONGO DB
mongoose.connect('mongodb://tommirok:rokolampi2@ds217138.mlab.com:17138/notes');
mongoose.connection.on('error', function(error) {
  console.error('Database connection error:', error);
});

mongoose.connection.once('open', function() {
  console.log('Database connected');
});

//Corssit
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credientals', 'true');
  res.setHeader('Access-Control-Allow-Methods',
'GET, HEAD, OPTIONS, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
  //Juuri
  router.get('/', (req, res)=>{
    res.json({
      message: 'API inialized'
    });
  });

//GET kaikki notesit
  router.route('/notes')
  .get((req, res)=>{
    Note.find((err, notes)=>{
        if(err)
        res.send(err);
        res.json(notes)
    });
  })//POST Note alkaa
  .post((req, res)=>{
    var note = new Note();
    note.date = req.body.date;
    note.note = req.body.note;

    note.save((err)=>{
      if(err)
      res.send(err);
      res.json({message: 'Note added Succesfully!!'});
    });
  });
  //Loppuuu
  router.route('/user')
  .post((req,res)=>{
    var user = new User();
    user.username = req.body.username;
    username.password = req.body.password;
  });

router.route('/comments')
.get((req, res) =>{
  Comment.find((err, comments)=>{
    if(err) res.send(`jotain meni pieleen latauksessa ${err}`);
    res.json(comments);
  });
})
.post((req, res)=>{
  var comment = new Comment();
  comment.id = req.body.id
  comment.name = "testi";
  comment.comment = req.body.comment

  comment.save((err)=>{
    if(err) res.send(`jotain meni pieleen lähetyksessä ${err}`);
    res.json({message: 'Comment added Succesfully'})
  })
})

  //api polku

  app.use('/api', router);

  app.listen(port, ()=>{
    console.log(`api running on port ${port}`);
  })
