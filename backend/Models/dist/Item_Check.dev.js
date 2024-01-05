"use strict";

//ItemChecks Model
var itemCheckSchema = new mongoose.Schema({
  vendorCode: {
    type: String,
    required: true
  },
  batchCode: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  quantityChecked: {
    type: Number,
    required: true
  },
  teamName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  updatedAt: {
    type: Date,
    "default": null
  }
});
var ItemCheck = mongoose.model('ItemCheck', itemCheckSchema);
module.exports = ItemCheck;