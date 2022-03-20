const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser())
app.use("/", userRoutes);
app.set("view engine", "ejs");

const uri =
  "mongodb://ulipese:401978@cluster0-shard-00-00.oj6gp.mongodb.net:27017,cluster0-shard-00-01.oj6gp.mongodb.net:27017,cluster0-shard-00-02.oj6gp.mongodb.net:27017/usersDB?ssl=true&replicaSet=atlas-12r13z-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
});

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`The server is running successfully in ${port}`);
});
