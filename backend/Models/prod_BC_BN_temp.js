const mongoose = require('mongoose')

const productionBCBNTempschema = new mongoose.Schema({
    boxNOS : {type:String,required:true},
    BoxBC : {type:String,required:true}
})

const ProdBCBN = mongoose.model('ProdBCBN',productionBCBNTempschema);

module.exports = ProdBCBN;