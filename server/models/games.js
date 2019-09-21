const mongoose = require('mongoose');

const { Schema } = mongoose;
const game = new Schema({

  user: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: true,
  },

  description: {
    type: String,
    required: true,
    unique: false,
  },

  question: {
    type: String,
    required: true,
    unique: false,
    maxlength: 10,
  },

  date_created: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  status: {
    type: 'String',
    required: true,
    default: 'pending',
  },

});

module.exports = mongoose.model('Games', game);
