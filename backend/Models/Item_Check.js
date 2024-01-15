  //ItemChecks Model
const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose')
  const itemCheckSchema = new mongoose.Schema({
    vendorCode: { type: String, required: true },
    batchCode: { type: String, required: true },
    venue: { type: String, required: true },
    quantityChecked: { type: Number, required: true },
    teamName: { type: Array, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
    toAccept:{type:String,required:true,default:0}
  });
  
  const ItemCheck = mongoose.model('ItemCheck', itemCheckSchema);
  
  module.exports = ItemCheck;