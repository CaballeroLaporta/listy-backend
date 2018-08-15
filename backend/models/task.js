'use strict';

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate:{
    type:Date,
    required:true
  }
}, {
  timestamps: true
});

const Task = mongoose.model('Task', userSchema);

module.exports = Task;