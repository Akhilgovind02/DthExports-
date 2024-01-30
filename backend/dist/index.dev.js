"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

var cors = require("cors");

var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

var User = require("./Models/user_model");

var check = require("./Models/Item_Check");

var Accept = require("./Models/item_accept_temp");

var Acceptperm = require("./Models/item_accept_perm");

var ProdBCBN_temp = require("./Models/prod_BC_BN_temp");

var TheDayStart = require('./Models/daystart');

var process_temp = require("./Models/processTemp");

var DayStart = require("./Models/daystart");

var app = express();
var port = 2500;
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/DTH", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Connected to MongoDB");
})["catch"](function (error) {
  console.error("MongoDB connection error:", error);
});
app.use(bodyParser.json()); // Create a predefined user and save it to the database

var createPredefinedUser = function createPredefinedUser() {
  var user, hashPassword, existingUser;
  return regeneratorRuntime.async(function createPredefinedUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: "roy@demo.com"
          }).exec());

        case 3:
          user = _context.sent;

          if (!user) {
            _context.next = 8;
            break;
          }

          console.log("User found:", user);
          _context.next = 14;
          break;

        case 8:
          hashPassword = bcrypt.hashSync("123456", 10);
          console.log(hashPassword); // Use User.create to both create and save the user in the database

          _context.next = 12;
          return regeneratorRuntime.awrap(User.create({
            first_name: "Roy",
            email: "roy@demo.com",
            phone: "7474738",
            password: hashPassword,
            status: 1
          }));

        case 12:
          existingUser = _context.sent;
          console.log("Predefined user created and saved to the database");

        case 14:
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error("Error:", _context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}; // Invoke the function to create the predefined user


createPredefinedUser();
app.post("/login", function _callee(req, res) {
  var user, enteredPassword, passwordMatch;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(User);
          _context2.prev = 1;
          console.log(req.body);
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 5:
          user = _context2.sent;

          if (!user) {
            _context2.next = 18;
            break;
          }

          enteredPassword = req.body.password;
          _context2.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(enteredPassword, user.password));

        case 10:
          passwordMatch = _context2.sent;

          if (!passwordMatch) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.json({
            status: "ok",
            user: user.email
          }));

        case 15:
          return _context2.abrupt("return", res.status(401).send("Wrong Password"));

        case 16:
          _context2.next = 19;
          break;

        case 18:
          return _context2.abrupt("return", res.json({
            status: "not ok",
            user: false
          }));

        case 19:
          _context2.next = 25;
          break;

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](1);
          console.error("Error during login:", _context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            status: "error",
            message: "Internal server error"
          }));

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 21]]);
}); // item_check_start

app.get("/incomingcheck", function _callee2(req, res) {
  var currentDate, formattedDateTime, uniqueBatchCode;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          currentDate = new Date();
          formattedDateTime = "".concat(currentDate.getFullYear() % 100).concat(currentDate.getMonth() + 1).concat(currentDate.getDate()).concat(currentDate.getHours()).concat(currentDate.getSeconds());
          console.log(formattedDateTime);
          uniqueBatchCode = "B_".concat(formattedDateTime);
          return _context3.abrupt("return", res.json({
            batchcode: uniqueBatchCode
          }));

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(422).send("Invalid Venue Code"));

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.post("/recievecheck", function _callee3(req, res) {
  var checkdata;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          checkdata = req.body.body;
          _context4.next = 4;
          return regeneratorRuntime.awrap(check.create({
            vendorCode: checkdata.VC,
            batchCode: checkdata.batchcode,
            venue: checkdata.venue,
            quantityChecked: checkdata.TQC,
            teamName: checkdata.team,
            status: 1,
            updatedAt: checkdata.updatedAt
          }));

        case 4:
          console.log("Check data received and saved to mongoDB");
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.log("Check data not recieved");

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // item_check_end
// item_accept_start

app.get("/bctoaccept", function _callee4(req, res) {
  var BCdata, sortedBC, BC, BNdata, BND, length;
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(check.find({
            toAccept: 0
          }));

        case 3:
          BCdata = _context5.sent;

          if (!(BCdata[0].toAccept == 0)) {
            _context5.next = 27;
            break;
          }

          sortedBC = BCdata.sort(function (a, b) {
            return a.createdAt - b.createdAt;
          });
          BC = sortedBC[0].batchCode;
          console.log("sortedBC", sortedBC);
          _context5.next = 10;
          return regeneratorRuntime.awrap(Accept.find({
            batchCode: BC
          }));

        case 10:
          BNdata = _context5.sent;
          BND = [];
          length = BNdata.length;

          for (i = 0; i < length; i++) {
            BND.push(BNdata[i].boxRef);
          }

          console.log(BND); // if(!BNdata){
          //   res.json({"message":"No Items in queue for acceptance"})
          // }
          // else{
          //   let BN = BNdata[0].boxRef
          //   res.json(BN);
          // }

          if (BC) {
            _context5.next = 19;
            break;
          }

          res.send("No Item To Accept");
          _context5.next = 25;
          break;

        case 19:
          if (!(BNdata.length < 1)) {
            _context5.next = 23;
            break;
          }

          console.log("NO box number");
          _context5.next = 24;
          break;

        case 23:
          return _context5.abrupt("return", res.json([{
            AcceptBC: BC
          }, {
            BoxNumber: BND
          }]));

        case 24:
          return _context5.abrupt("return", res.json([{
            AcceptBC: BC
          }]));

        case 25:
          _context5.next = 28;
          break;

        case 27:
          res.send("No batchcode to add");

        case 28:
          _context5.next = 33;
          break;

        case 30:
          _context5.prev = 30;
          _context5.t0 = _context5["catch"](0);
          res.status(400).send(_context5.t0);

        case 33:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 30]]);
});
app.post("/itemaccept", function _callee5(req, res) {
  var acceptData;
  return regeneratorRuntime.async(function _callee5$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          acceptData = req.body.body;
          console.log(acceptData);
          _context6.next = 5;
          return regeneratorRuntime.awrap(Accept.create({
            batchCode: acceptData.Bactcode,
            boxRef: acceptData.BoxNumber,
            sizeRef: acceptData.Box_size,
            colorRef: acceptData.Box_colour,
            textureRef: acceptData.Box_texture,
            materialQty: acceptData.MaterialQuantity,
            imagePath: acceptData.Image,
            process: acceptData.process,
            updatedAt: acceptData.UpdatedAt
          }));

        case 5:
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.log("Error in accepting the item : ", _context6.t0);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // item_accept_end
// main submit start

app.post("/toacceptperm", function _callee6(req, res) {
  var acceptData, documentsToCopy, BCdata;
  return regeneratorRuntime.async(function _callee6$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          acceptData = req.body.body;
          _context7.next = 4;
          return regeneratorRuntime.awrap(Accept.create({
            batchCode: acceptData.Bactcode,
            boxRef: acceptData.BoxNumber,
            sizeRef: acceptData.Box_size,
            colorRef: acceptData.Box_colour,
            textureRef: acceptData.Box_texture,
            materialQty: acceptData.MaterialQuantity,
            imagePath: acceptData.Image,
            process: acceptData.process,
            updatedAt: acceptData.UpdatedAt
          }));

        case 4:
          AcceptCollection = Accept.collection;
          _context7.next = 7;
          return regeneratorRuntime.awrap(AcceptCollection.find({}).toArray());

        case 7:
          documentsToCopy = _context7.sent;
          console.log("documentdata", documentsToCopy);
          _context7.next = 11;
          return regeneratorRuntime.awrap(Acceptperm.insertMany(documentsToCopy));

        case 11:
          BCdata = check.find({
            batchCode: acceptData.Bactcode
          });
          _context7.next = 14;
          return regeneratorRuntime.awrap(check.findOneAndUpdate({
            batchCode: acceptData.Bactcode
          }, {
            $set: {
              toAccept: 1
            }
          }));

        case 14:
          _context7.next = 16;
          return regeneratorRuntime.awrap(Accept.deleteMany({}));

        case 16:
          _context7.next = 21;
          break;

        case 18:
          _context7.prev = 18;
          _context7.t0 = _context7["catch"](0);
          console.log("Error in accepting the item : ", _context7.t0);

        case 21:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 18]]);
}); //main submit end
//Day start begin

app.post("/getprocess", function _callee7(req, res) {
  var Cprocess, currentPRocess;
  return regeneratorRuntime.async(function _callee7$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          Cprocess = req.body.body.Process_;
          _context8.next = 4;
          return regeneratorRuntime.awrap(process_temp.find({
            currentprocess: Cprocess
          }));

        case 4:
          currentPRocess = _context8.sent;

          if (!currentPRocess) {
            _context8.next = 9;
            break;
          }

          console.log("it already exists");
          _context8.next = 11;
          break;

        case 9:
          _context8.next = 11;
          return regeneratorRuntime.awrap(process_temp.create({
            currentprocess: Cprocess
          }));

        case 11:
          _context8.next = 16;
          break;

        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](0);
          console.log("error in process post request");

        case 16:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
app.get("/daystart", function _callee8(req, res) {
  var batchdata, sortedBC, BC, BNdata, sortedBNdata, BND, mQTY, length, prevProcess, BNwithdata;
  return regeneratorRuntime.async(function _callee8$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(Acceptperm.find({
            toProduction: 0
          }));

        case 3:
          batchdata = _context9.sent;

          if (!(batchdata[0].toProduction == 0)) {
            _context9.next = 33;
            break;
          }

          sortedBC = batchdata.sort(function (a, b) {
            return a.createdAt - b.createdAt;
          });
          BC = sortedBC[0].batchCode; // console.log("BC",BC)
          // console.log("sortedBC",sortedBC);

          _context9.next = 9;
          return regeneratorRuntime.awrap(Acceptperm.find({
            batchCode: BC,
            finishBox: 0
          }));

        case 9:
          BNdata = _context9.sent;
          sortedBNdata = BNdata.sort(function (a, b) {
            return a.createdAt - b.createdAt;
          }); // console.log("BNdata",BNdata);

          BND = [];
          mQTY = [];
          length = sortedBNdata.length;

          for (i = 0; i < length; i++) {
            BND.push(sortedBNdata[i].boxRef);
            mQTY.push(sortedBNdata[i].materialQty);
          } // console.log(mQTY);


          _context9.next = 17;
          return regeneratorRuntime.awrap(process_temp.find());

        case 17:
          prevProcess = _context9.sent;
          _context9.next = 20;
          return regeneratorRuntime.awrap(Acceptperm.find({
            boxRef: BND,
            batchCode: BC,
            materialQty: mQTY
          }));

        case 20:
          BNwithdata = _context9.sent;

          if (BC) {
            _context9.next = 25;
            break;
          }

          res.send("No Item To Accept");
          _context9.next = 31;
          break;

        case 25:
          if (!(BNdata.length < 1)) {
            _context9.next = 29;
            break;
          }

          console.log("NO box number");
          _context9.next = 30;
          break;

        case 29:
          return _context9.abrupt("return", res.json([{
            AcceptBC: BC
          }, {
            BoxNumber: BND
          }, {
            BNDdata: BNwithdata
          }, {
            Quantity: mQTY
          }, {
            ProcessBefore: prevProcess[0].currentprocess
          }]));

        case 30:
          return _context9.abrupt("return", res.json([{
            AcceptBC: BC
          }]));

        case 31:
          _context9.next = 34;
          break;

        case 33:
          res.send("Please Wait For The Next Day");

        case 34:
          _context9.next = 39;
          break;

        case 36:
          _context9.prev = 36;
          _context9.t0 = _context9["catch"](0);
          console.log("Error in getting data from database");

        case 39:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 36]]);
});
app.post("/daystartpost", function _callee9(req, res) {
  var daystartData, DaystartBCBN;
  return regeneratorRuntime.async(function _callee9$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          daystartData = req.body.body;
          _context10.next = 4;
          return regeneratorRuntime.awrap(DayStart.find({
            batchNumber: daystartData.Batch_Code,
            boxNum: daystartData.Box_No
          }));

        case 4:
          DaystartBCBN = _context10.sent;

          if (!DaystartBCBN) {
            _context10.next = 10;
            break;
          }

          _context10.next = 8;
          return regeneratorRuntime.awrap(TheDayStart.updateOne({
            team: daystartData.workers,
            imagePath: daystartData.image,
            materialQTY: daystartData.material_qty
          }));

        case 8:
          _context10.next = 12;
          break;

        case 10:
          _context10.next = 12;
          return regeneratorRuntime.awrap(TheDayStart.create({
            batchNumber: daystartData.Batch_Code,
            boxNum: daystartData.Box_No,
            process: daystartData.Process_,
            team: daystartData.workers,
            imagePath: daystartData.image,
            materialQTY: daystartData.material_qty
          }));

        case 12:
          _context10.next = 17;
          break;

        case 14:
          _context10.prev = 14;
          _context10.t0 = _context10["catch"](0);
          console.log("error in post request");

        case 17:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 14]]);
}); //Day start end
//Day end start

app.get('/dayend', function _callee10(req, res) {
  var DaystartgetData;
  return regeneratorRuntime.async(function _callee10$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(DayStart.find({}));

        case 3:
          DaystartgetData = _context11.sent;
          console.log(DaystartgetData[0].batchNumber);
          return _context11.abrupt("return", res.json([{
            BatchNo: DaystartgetData[0].batchNumber
          }, {
            BoxNo: DaystartgetData[0].boxNum
          }, {
            endProcess: DaystartgetData[0].process
          }, {
            workersEnd: DaystartgetData[0].team
          }, {
            EndMQnty: DaystartgetData[0].materialQTY
          }]));

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          console.log('Error In Fetching Data From Database');

        case 11:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //Day end endss

app.listen(port, function () {
  return console.log("Server is running");
});