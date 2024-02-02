const mongoose = require('mongoose');

const dayendTemp = new mongoose.Schema({
    batchNumber : {type:String,required:true},
    boxNum : {type:String,required:true},
    process:{type:String,required:true},
    materialQTY: {type:Number,required:true},
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: String, default: null },
});

const DayEndTemp = mongoose.model('DayEndTemp',dayendTemp);

module.exports = DayEndTemp;