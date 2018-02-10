//model for Notes Schema

'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotesSchema = new Schema({
  date: String,
  note: String,
});

module.exports = mongoose.model('Note', NotesSchema);
