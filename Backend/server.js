const express = require("express")
var bodyParser = require('body-parser')
var cors = require("cors");

const app = express()
app.use(cors())


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


const reviewRoutes = require("./routes/reviewRoute");
app.use("/reviews", reviewRoutes);


app.listen(9999, ()=>{
  console.log("server is running on port : ", 9999)
});