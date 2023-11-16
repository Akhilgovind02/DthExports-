const express = require('express');
const path  = require('path');
const mysql = require('mysql');
const { stringify } = require('querystring');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors')
const app = express();
const port = 2500;
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dth'
})
app.set('view engine','ejs');
app.set('views', __dirname+'/view');
router.get('/',(req,res) => {
    res.send("Hello World")
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const selquery = "SELECT * FROM users WHERE email = '"+email+"' AND password = '"+password+"'";
  
    connection.query(selquery, [email, password], (err, rows) => {
      if (rows.length > 0) {
        res.json({ success: true, message: 'Login successful', user: rows[0] });
        // res.redirect('/home');
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    });
  });
app.use('/', router);
app.listen(port, () => console.log("server is running"));