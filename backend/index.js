const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./Models/user_model');
const check = require('./Models/Item_Check')

const app = express();
const port = 2500;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/DTH', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log("Connected to MongoDB") })
  .catch((error) => { console.error("MongoDB connection error:", error) });

app.use(bodyParser.json());

// Create a predefined user and save it to the database

const createPredefinedUser = async () => {
  try {
    const user = await User.findOne({ email: 'roy@demo.com' }).exec();

    if (user) {
      console.log('User found:', user);
    } else {
      const hashPassword = bcrypt.hashSync('123456', 10);
      console.log(hashPassword);

      // Use User.create to both create and save the user in the database
      const existingUser = await User.create({
        first_name: "Roy",
        email: 'roy@demo.com',
        phone: '7474738',
        password: hashPassword,
        status: 1
      });

      console.log('Predefined user created and saved to the database');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Invoke the function to create the predefined user
createPredefinedUser();

app.post('/login', async (req, res) => {

console.log(User);
      try {
        console.log(req.body);
        const user = await User.findOne({ email: req.body.email});
    
        if (user) {
          const enteredPassword = req.body.password;
          const passwordMatch = await bcrypt.compare(enteredPassword, user.password);
          if(passwordMatch){
            return res.json({ status: 'ok', user: user.email });
          }
          else{
            return res.status(401).send("Wrong Password");
          }
        }
        else {
          return res.json({ status: 'not ok', user: false });
        }
      } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
      }
  
   
  });

  
  app.get('/incomingcheck', async (req,res) =>{
    try{
    const currentDate = new Date();
    const formattedDateTime = `${currentDate.getFullYear()%100}${currentDate.getMonth() + 1}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getSeconds()}`;
    console.log(formattedDateTime);

    const uniqueBatchCode = `B_${formattedDateTime}`;
    return res.json({ "batchcode":uniqueBatchCode});
    }catch{
      return res.status(422).send("Invalid Venue Code")
    }
    
  });

  app.post('/recievecheck', async (req,res) =>  {
    try{
      const checkdata = req.body.body
     await check.create({
      vendorCode: checkdata.VC,
      batchCode: checkdata.batchcode,
      venue: checkdata.venue,
      quantityChecked: checkdata.TQC,
      teamName: checkdata.team,
      status: 1,
      updatedAt:checkdata.updatedAt
    });
    console.log("Check data received and saved to mongoDB")
    } catch {
      console.log('Check data not recieved')
    }
  })

  


app.listen(port, () => console.log('Server is running'));
