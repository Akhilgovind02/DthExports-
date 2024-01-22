const mongoose = require('mongoose');


const acceptTempSchema = new mongoose.Schema({
  batchCode: { type: String, required: true },
  boxRef: { type: Number, required: true },
  sizeRef: { type: String, required: true },
  colorRef: { type: String, required: true },
  textureRef: { type: String, required: true },
  materialQty: { type: Number, required: true },
  imagePath: { type: String, required: true },
  process: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: String, default: null },
});

const AcceptTemp = mongoose.model('AcceptTemp', acceptTempSchema);

module.exports = AcceptTemp;