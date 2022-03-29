require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/", userRoutes);
app.set("view engine", "ejs");

const uri = process.env.DB_URI_KEY;

mongoose.connect(uri, {
  useNewUrlParser: true,
});

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`The server is running successfully in ${port}`);
});
