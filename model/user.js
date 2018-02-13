"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConf: {
    type: String,
    required: true
  }
});
UserSchema.pre("save", function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(`toimiikohan tämä ${err}`);
    }
    user.password = hash;
    next(err);
  });
});
UserSchema.pre("save", function(next) {
  var user = this;
  bcrypt.hash(user.passwordConf, 10, (err, hashConf) => {
    if (err) {
      return next(`toimiikohan tämä ${err}`);
    }
    user.passwordConf = hashConf;
    next(err);
  });
});
//Autentikointi tietokantaa vasten
UserSchema.statics.authenticate = (model, username, password, callback) => {
  model.findOne({ username: username }).exec((err, user) => {
    if (err) {
      return callback(err);
    } else if (!user) {
      var err = new Error("User not found");
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};
module.exports = mongoose.model("User", UserSchema);
