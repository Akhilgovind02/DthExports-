const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./Models/user_model");
const check = require("./Models/Item_Check");
const Accept = require("./Models/item_accept_temp");
const Acceptperm = require("./Models/item_accept_perm");
const ProdBCBN_temp = require("./Models/prod_BC_BN_temp");
const DayStart = require('./Models/daystart');
const process_temp = require("./Models/processTemp");
const DayEndTemp = require('./Models/dayendtemp');

const app = express();
const port = 2500;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/DTH", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(bodyParser.json());

// Create a predefined user and save it to the database

const createPredefinedUser = async () => {
  try {
    const user = await User.findOne({ email: "roy@demo.com" }).exec();

    if (user) {
      console.log("User found:", user);
    } else {
      const hashPassword = bcrypt.hashSync("123456", 10);
      console.log(hashPassword);

      // Use User.create to both create and save the user in the database
      const existingUser = await User.create({
        first_name: "Roy",
        email: "roy@demo.com",
        phone: "7474738",
        password: hashPassword,
        status: 1,
      });

      console.log("Predefined user created and saved to the database");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// Invoke the function to create the predefined user
createPredefinedUser();

app.post("/login", async (req, res) => {
  console.log(User);
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const enteredPassword = req.body.password;
      const passwordMatch = await bcrypt.compare(
        enteredPassword,
        user.password
      );
      if (passwordMatch) {
        return res.json({ status: "ok", user: user.email });
      } else {
        return res.status(401).send("Wrong Password");
      }
    } else {
      return res.json({ status: "not ok", user: false });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
});

// item_check_start

app.get("/incomingcheck", async (req, res) => {
  try {
    const currentDate = new Date();
    const formattedDateTime = `${currentDate.getFullYear() % 100}${
      currentDate.getMonth() + 1
    }${currentDate.getDate()}${currentDate.getHours()}${currentDate.getSeconds()}`;
    console.log(formattedDateTime);

    const uniqueBatchCode = `B_${formattedDateTime}`;
    return res.json({ batchcode: uniqueBatchCode });
  } catch {
    return res.status(422).send("Invalid Venue Code");
  }
});

app.post("/recievecheck", async (req, res) => {
  try {
    const checkdata = req.body.body;
    await check.create({
      vendorCode: checkdata.VC,
      batchCode: checkdata.batchcode,
      venue: checkdata.venue,
      quantityChecked: checkdata.TQC,
      teamName: checkdata.team,
      status: 1,
      updatedAt: checkdata.updatedAt,
    });
    console.log("Check data received and saved to mongoDB");
  } catch {
    console.log("Check data not recieved");
  }
});

// item_check_end

// item_accept_start

app.get("/bctoaccept", async (req, res) => {
  try {
    let BCdata = await check.find({ toAccept: 0 });
    if (BCdata[0].toAccept == 0) {
      const sortedBC = BCdata.sort((a, b) => a.createdAt - b.createdAt);
      let BC = sortedBC[0].batchCode;
      console.log("sortedBC", sortedBC);
      let BNdata = await Accept.find({ batchCode: BC });
      let BND = [];
      let length = BNdata.length;
      for (i = 0; i < length; i++) {
        BND.push(BNdata[i].boxRef);
      }
      console.log(BND);

      // if(!BNdata){
      //   res.json({"message":"No Items in queue for acceptance"})
      // }
      // else{
      //   let BN = BNdata[0].boxRef
      //   res.json(BN);
      // }
      if (!BC) {
        res.send("No Item To Accept");
      } else {
        if (BNdata.length < 1) {
          console.log("NO box number");
        } else {
          return res.json([{ AcceptBC: BC }, { BoxNumber: BND }]);
        }

        return res.json([{ AcceptBC: BC }]);
      }
    } else {
      res.send("No batchcode to add");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/itemaccept", async (req, res) => {
  try {
    var acceptData = req.body.body;
    console.log(acceptData);
    await Accept.create({
      batchCode: acceptData.Bactcode,
      boxRef: acceptData.BoxNumber,
      sizeRef: acceptData.Box_size,
      colorRef: acceptData.Box_colour,
      textureRef: acceptData.Box_texture,
      materialQty: acceptData.MaterialQuantity,
      imagePath: acceptData.Image,
      process: acceptData.process,
      updatedAt: acceptData.UpdatedAt,
    });
  } catch (error) {
    console.log("Error in accepting the item : ", error);
  }
});

// item_accept_end

// main submit start

app.post("/toacceptperm", async (req, res) => {
  try {
    var acceptData = req.body.body;
    await Accept.create({
      batchCode: acceptData.Bactcode,
      boxRef: acceptData.BoxNumber,
      sizeRef: acceptData.Box_size,
      colorRef: acceptData.Box_colour,
      textureRef: acceptData.Box_texture,
      materialQty: acceptData.MaterialQuantity,
      imagePath: acceptData.Image,
      process: acceptData.process,
      updatedAt: acceptData.UpdatedAt,
    });

    AcceptCollection = Accept.collection;
    const documentsToCopy = await AcceptCollection.find({}).toArray();
    console.log("documentdata", documentsToCopy);

    await Acceptperm.insertMany(documentsToCopy);

    let BCdata = check.find({ batchCode: acceptData.Bactcode });
    await check.findOneAndUpdate(
      { batchCode: acceptData.Bactcode },
      { $set: { toAccept: 1 } }
    );

    await Accept.deleteMany({});
    // console.log("bcdata",BCdata)
  } catch (error) {
    console.log("Error in accepting the item : ", error);
  }
});

//main submit end

//Day start begin

app.post("/getprocess", async (req, res) => {
  try {
    const Cprocess = req.body.body.Process_;
    let currentPRocess = await process_temp.find({ currentprocess: Cprocess });
    if (currentPRocess.length>0) {
      console.log("it already exists");
    } else {
      await process_temp.create({
        currentprocess: Cprocess,
      });
    }
  } catch {
    console.log("error in process post request");
  }
});

app.get("/daystart", async (req, res) => {
  try {
    let batchdata = await Acceptperm.find({ toProduction: 0 });
    if (batchdata[0].toProduction == 0) {
      const sortedBC = batchdata.sort((a, b) => a.createdAt - b.createdAt);
      let BC = sortedBC[0].batchCode;
      // console.log("BC",BC)
      // console.log("sortedBC",sortedBC);
      let BNdata = await Acceptperm.find({ batchCode: BC, finishBox: 0 });
      const sortedBNdata = BNdata.sort((a, b) => a.createdAt - b.createdAt);
      // console.log("BNdata",BNdata);
      let BND = [];
      let mQTY = [];
      let length = sortedBNdata.length;
      for (i = 0; i < length; i++) {
        BND.push(sortedBNdata[i].boxRef);
        mQTY.push(sortedBNdata[i].materialQty);
      }
      // console.log(mQTY);

      const prevProcess = await process_temp.find();

      let BNwithdata = await Acceptperm.find({
        boxRef: BND,
        batchCode: BC,
        materialQty: mQTY,
      });
      // console.log(BNdata)

      if (!BC) {
        res.send("No Item To Accept");
      } else {
        if (BNdata.length < 1) {
          console.log("NO box number");
        } else {
          return res.json([
            { AcceptBC: BC },
            { BoxNumber: BND },
            { BNDdata: BNwithdata },
            { Quantity: mQTY },
            { ProcessBefore: prevProcess[0].currentprocess },
          ]);
        }

        return res.json([{ AcceptBC: BC }]);
      }
    } else {
      res.send("Please Wait For The Next Day");
    }
  } catch {
    console.log("Error in getting data from database");
  }
});

app.post("/daystartpost", async (req, res) => {
  try {

    const daystartData = req.body.body;


    // let DaystartBCBN


    // if(TheDayStart.length>0){
     let DaystartBCBN = await DayStart.find({batchNumber:daystartData.Batch_Code,boxNum:daystartData.Box_No})
      console.log(DaystartBCBN.length)
    // }






    if(DaystartBCBN.length==0){
      await DayStart.create({
        batchNumber:daystartData.Batch_Code,
        boxNum:daystartData.Box_No,
        process:daystartData.Process_,
        team: daystartData.workers,
        materialQTY: daystartData.material_qty,
        imagePath: daystartData.image,
        updatedAt:daystartData.updatedAt
      });   
     }
  else{
    await DayStart.updateOne({
      batchNumber: daystartData.Batch_Code,
      boxNum: daystartData.Box_No,
      process: daystartData.Process_,
      team: daystartData.workers,
      materialQTY: daystartData.material_qty,
      imagePath: daystartData.image,
      updatedAt:daystartData.updatedAt
    });
  }
  } catch {
    console.log("error in post request"); 
  }
});

//Day start end



//Day end start



app.get('/dayend', async (req,res) => {
  try{
    let DaystartgetData = await DayStart.find({});
    console.log(DaystartgetData[0].batchNumber);
    return res.json([
      {BatchNo:DaystartgetData[0].batchNumber},
      {BoxNo:DaystartgetData[0].boxNum},
      {endProcess:DaystartgetData[0].process},
      {workersEnd:DaystartgetData[0].team},
      {EndMQnty:DaystartgetData[0].materialQTY}
    ]);
  }catch{
    console.log('Error In Fetching Data From Database');
  }

})

app.post('/DayendTempPost', async(req,res) =>{
  try{
    let DayEndTempData = req.body.body;
    console.log(DayEndTempData.Batch_Code)
    await DayEndTemp.create({
    batchNumber :DayEndTempData.Batch_Code,
    boxNum : DayEndTempData.Box_No,
    process:DayEndTempData.Process_,
    materialQTY: DayEndTempData.material_qty,
    updatedAt: DayEndTempData.UpdatedAt
    })
  }catch{
    console.log("Error in Adding data to the database");
  }
})



app.post('/finishBox',(req,res)=> {
  
})

//Day end endss

app.listen(port, () => console.log("Server is running"));
