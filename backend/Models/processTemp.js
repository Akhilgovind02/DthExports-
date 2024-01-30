const mongoose = require('mongoose')

const processTempschema = new mongoose.Schema({
    currentprocess : {type:String,required:true,unique:true}
});

const processTemp = mongoose.model('DaystartTemp',processTempschema)

module.exports = processTemp;