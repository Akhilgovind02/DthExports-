"use strict";

var mongoose = require('mongoose');

var Daystartschema = new mongoose.Schema({
  batchNumber: {
    type: String,
    required: true
  },
  boxNum: {
    type: String,
    required: true
  },
  process: {
    type: String,
    required: true
  },
  team: {
    type: Array,
    required: true
  },
  materialQTY: {
    type: Number,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  updatedAt: {
    type: String,
    "default": null
  }
});
var DayStart = mongoose.model('Daystart', Daystartschema);
module.exports = DayStart;