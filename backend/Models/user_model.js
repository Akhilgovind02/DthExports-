const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;

// User Model

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  hash_password: { type: String, required: true },
  status: { type: Number, required: true },
});

// Define a static method to create a sample document
// userSchema.statics.createSampleDocument = function () {
//   return new this({
//     first_name: "Akhil",
//     email: "akhil@demo.com",
//     phone: 97989789,
//     password: "123456",
//     status: 1
//   });
// };

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   try {
//     const hash = await bcrypt.hash(this.password, saltRounds);
//     this.password = hash;
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     return await bcrypt.compare(candidatePassword, this.password);
//   } catch (error) {
//     throw error;
//   }
// };


const User = mongoose.model('User', userSchema);

module.exports = User;


// // AcceptTemps Model:

// const acceptTempSchema = new mongoose.Schema({
//   batchCode: { type: String, required: true },
//   boxRef: { type: String, required: true },
//   sizeRef: { type: String, required: true },
//   colorRef: { type: String, required: true },
//   textureRef: { type: String, required: true },
//   materialQty: { type: Number, required: true },
//   imagePath: { type: String, required: true },
//   process: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: null },
// });

// const AcceptTemp = mongoose.model('AcceptTemp', acceptTempSchema);

// module.exports = AcceptTemp;

// //BoxSettings Model:

// const boxSettingsSchema = new mongoose.Schema({
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: null },
// });

// const BoxSettings = mongoose.model('BoxSettings', boxSettingsSchema);

// module.exports = BoxSettings;

// // colors model

// const colorSchema = new mongoose.Schema({
//     colorName: { type: String, required: true, unique: true },
//     colorCode: { type: String, required: true, unique: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: null },
//   });
  
//   const Color = mongoose.model('Color', colorSchema);
  
//   module.exports = Color;

//   //Despatches Model:

//   const despatchSchema = new mongoose.Schema({
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: null },
//   });
  
//   const Despatch = mongoose.model('Despatch', despatchSchema);
  
//   module.exports = Despatch;

//   //FailedJobs Model:

//   const failedJobSchema = new mongoose.Schema({
//     uuid: { type: String, required: true, unique: true },
//     connection: { type: String, required: true },
//     queue: { type: String, required: true },
//     payload: { type: String, required: true },
//     exception: { type: String, required: true },
//     failedAt: { type: Date, default: Date.now },
//   });
  
//   const FailedJob = mongoose.model('FailedJob', failedJobSchema);
  
//   module.exports = FailedJob;

//   //ItemAccepts Model:

//   const itemAcceptSchema = new mongoose.Schema({
//     batchCode: { type: String, required: true },
//     boxRef: { type: Number, required: true },
//     sizeRef: { type: Number, required: true },
//     colorRef: { type: Number, required: true },
//     materialQty: { type: Number, required: true },
//     imagePath: { type: String, required: true },
//     process: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: null },
//   });
  
//   const ItemAccept = mongoose.model('ItemAccept', itemAcceptSchema);
  
//   module.exports = ItemAccept;

//   //ItemChecks Model

//   const itemCheckSchema = new mongoose.Schema({
//     vendorCode: { type: String, required: true },
//     batchCode: { type: String, required: true },
//     venue: { type: String, required: true },
//     quantityChecked: { type: Number, required: true },
//     teamName: { type: String, required: true },
//     status: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: null },
//   });
  
//   const ItemCheck = mongoose.model('ItemCheck', itemCheckSchema);
  
//   module.exports = ItemCheck;

//   //MediaTemps Model:

//   const mediaTempSchema = new mongoose.Schema({
//     imagePath: { type: String, required: true },
//     status: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: null },
//   });
  
//   const MediaTemp = mongoose.model('MediaTemp', mediaTempSchema);
  
//   module.exports = MediaTemp;

//   //Productions Model:

//   const productionSchema = new mongoose.Schema({
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: null },
//   });
  
//   const Production = mongoose.model('Production', productionSchema);
  
//   module.exports = Production;

//   //Sizes Model:

//   const sizeSchema = new mongoose.Schema({
//     sizeOptions: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: null },
//   });
  
//   const Size = mongoose.model('Size', sizeSchema)

//   module.exports = Size;
  

