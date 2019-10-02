const mongoose = require('mongoose');

const { Schema } = mongoose;
const users = new Schema({

  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
  },

  gender: {
    type: String,
    required: true,
    unique: false,
    maxlength: 6,
  },

  password: {
    type: String,
    required: true,
    unique: false,
    maxlength: 70,
  },

  reg_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  pic: {
    type: String,
    required: false,
    unique: false,
  },

  scores: {
    type: Number,
    required: true,
    default: 0,
  },

});

module.exports = mongoose.model('Users', users);
