"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var cors = require('cors');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var User = require('./Models/user_model');

var app = express();
var port = 2500;
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/DTH', {
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
            email: 'roy@demo.com'
          }).exec());

        case 3:
          user = _context.sent;

          if (!user) {
            _context.next = 8;
            break;
          }

          console.log('User found:', user);
          _context.next = 14;
          break;

        case 8:
          hashPassword = bcrypt.hashSync('123456', 10);
          console.log(hashPassword); // Use User.create to both create and save the user in the database

          _context.next = 12;
          return regeneratorRuntime.awrap(User.create({
            first_name: "Roy",
            email: 'roy@demo.com',
            phone: '7474738',
            password: hashPassword,
            status: 1
          }));

        case 12:
          existingUser = _context.sent;
          console.log('Predefined user created and saved to the database');

        case 14:
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error('Error:', _context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}; // Invoke the function to create the predefined user


createPredefinedUser();
app.post('/login', function _callee(req, res) {
  var user, enteredPassword, passwordMatch;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(User);
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 4:
          user = _context2.sent;

          if (!user) {
            _context2.next = 17;
            break;
          }

          enteredPassword = req.body.password;
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(enteredPassword, user.password));

        case 9:
          passwordMatch = _context2.sent;

          if (!passwordMatch) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", res.json({
            status: 'ok',
            user: user.email
          }));

        case 14:
          return _context2.abrupt("return", res.status(401).send("Wrong Password"));

        case 15:
          _context2.next = 18;
          break;

        case 17:
          return _context2.abrupt("return", res.json({
            status: 'not ok',
            user: false
          }));

        case 18:
          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](1);
          console.error('Error during login:', _context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            status: 'error',
            message: 'Internal server error'
          }));

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 20]]);
});
app.get('/incomingCheck', function _callee2(req, res) {
  var currentDate, formattedDateTime, uniqueBatchCode;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          currentDate = new Date();
          formattedDateTime = "".concat(currentDate.getFullYear() % 100).concat(currentDate.getMonth() + 1).concat(currentDate.getDate()).concat(currentDate.getHours()).concat(currentDate.getSeconds());
          console.log(formattedDateTime);
          uniqueBatchCode = "B_".concat(formattedDateTime);
          return _context3.abrupt("return", res.json({
            "batchcode": uniqueBatchCode
          }));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.listen(port, function () {
  return console.log('Server is running');
});