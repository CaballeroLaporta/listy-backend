'use strict';

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email:{
    type:String,
    requiered:true
  },
  mytasks: [{
    type: ObjectId,
    ref: 'Task'
  }],
}, {

  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;