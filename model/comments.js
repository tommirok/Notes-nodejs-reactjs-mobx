

'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  id: Number,
  name: String,
  comment: String
});

module.exports = mongoose.model('Comment', CommentsSchema);
