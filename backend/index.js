


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./Models/user_model');

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
  // const existingUser = {}
  try {
    if(User == null){
      const hash_password = bcrypt.hashSync(123456, 10);
      const existingUser = await User.create({ first_name:"Akhil", email: 'akhil@demo.com', phone:'9977474', password:hash_password, status:1 });
      await existingUser.save();
      console.log('Predefined user created and saved to the database');
    }
    else{
      console.log("user already exists");
    }
    
  } catch (error) {
    console.error('Error creating predefined user:', error);
  };
};
// Invoke the function to create the predefined user
createPredefinedUser();

app.post('/login', async (req, res) => {

console.log(User);
  // try {
      try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password });
    
        if (user) {
          const token = jwt.sign(
            {
              email:user.email,

            },'secretkey')
          return res.json({ status: 'ok', user: user.email });
        } else {
          return res.json({ status: 'not ok', user: false });
        }
      } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
      }
    
  })

app.listen(port, () => console.log('Server is running'));
