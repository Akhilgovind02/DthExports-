// const express = require('express');
// const path  = require('path');
// const mysql = require('mysql');
// const { stringify } = require('querystring');
// const bodyParser = require('body-parser');
// const router = express.Router();
// const mongoose = require('mongoose');
// const cors = require('cors')
// const saltRounds = 10;
// const app = express();
// const User  = require('./Models/user_model')
// app.use(express.json());
// const bcrypt = require('bcrypt');
// const { error } = require('console');
// const port = 2500;
// app.use(cors());
// mongoose.connect('mongodb://localhost:27017/DTH')
// .then(()=>{ console.log("connected to db") })



// app.use(bodyParser.json());

// // const pool = mysql.createConnection({
// //     host:'localhost',
// //     user:'root',
// //     password:'',
// //     database:'dth'
// // })
// app.set('view engine','ejs');
// app.set('views', __dirname+'/view');
// // router.get('/',(req,res) => {
// //     res.send("Hello World")
// // });







// app.post('/login', async (req,res) => {
  
 

//   const{ email, password} = req.body;
//   // return res.json({email})
//   try{
    
//     const user = await User.findOne({ email });
//     // return res.json({User});
//     console.log('User: ',user)
//     console.log('User: ',User)

//     if(user) {
//       const ispasswordMatch = user.comparePassword(password);

//       if(ispasswordMatch) {
//         return res.json({status: 'ok', user:true})
//       }
//       else{
//         return res.json({status: 'error', message:"Invalid Password"});
//       }
//     }
//     else{
//       return res.json({status: 'error', message:"Invalid"});
//     }
//   } catch(error) {
//     console.log('Login Error:',error);
//     return res.status(500).json({status:'error', message: 'Internal server error'})
//   }
  
  
   
// });

// // app.post('/login', (req, res) => {
// //     const { email, password } = req.body;
// //     const hashedPassword = bcrypt.hashSync(password, 10);
// //     const selquery = "SELECT * FROM users WHERE email = '"+email+"' AND password = '"+password+"'";
  
// //     pool.query(selquery, [email, hashedPassword], (err, rows) => {
// //       if(err){
// //         console.log("Database Error :", err);
// //         return res.status(500),json({success:false, message:"Database error"});
// //       }
// //       if (rows.length > 0) {
// //         res.json({ success: true, message: 'Login successful', user: rows[0] });
// //         // res.redirect('/home');
// //       } else {
// //         res.status(401).json({ success: false, message: 'Invalid credentials' });
// //       }
// //     });
// //   });
// app.use('/', router);
// app.listen(port, () => console.log("server is running"));









const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

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
      const existingUser = await User.create({ first_name:"Akhil", email: 'akhil@demo.com', phone:'9977474', password:'123456', status:1 });
      await existingUser.save();
      console.log('Predefined user created and saved to the database');
    }
    else{
      console.log("user already exists");
    }
    
  } catch (error) {
    console.error('Error creating predefined user:', error);
  };
}
// Invoke the function to create the predefined user
createPredefinedUser();

app.post('/login', async (req, res) => {

console.log(User);
  // try {
      try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password });
    
        if (user) {
          return res.json({ status: 'ok', user: true });
        } else {
          return res.json({ status: 'not ok', user: false });
        }
      } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
      }
    
  })

app.listen(port, () => console.log('Server is running'));
