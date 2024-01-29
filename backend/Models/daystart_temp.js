const mongoose = require('mongoose')

const daystartTempschema = new mongoose.Schema({
    currentprocess : {type:String,required:true,unique:true}
});

const daystart_temp = mongoose.model('DaystartTemp',daystartTempschema)

module.exports = daystart_temp;