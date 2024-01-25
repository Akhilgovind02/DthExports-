const mongoose = require('mongoose');


const accceptpermschema = new mongoose.Schema({
  batchCode: { type: String, required: true },
  boxRef: { type: String, required: true },
  sizeRef: { type: String, required: true },
  colorRef: { type: String, required: true },
  textureRef: { type: String, required: true },
  materialQty: { type: Number, required: true },
  imagePath: { type: String, required: true },
  process: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  toProduction : {type : String, default:0},
  finishBox : {type:String,default:0},
  updatedAt: { type: String, default: null },
});

const Acceptperm = mongoose.model('AcceptPerm', accceptpermschema);

module.exports = Acceptperm;