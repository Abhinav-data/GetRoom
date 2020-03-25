require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
var cookieParser = require("cookie-parser");
var cors = require("cors");

const authRoutes = require("./routes/auth.js");

//DB connection...................
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB connected");
  });

//Middlewares.............................
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);

//PORT.....................................
const port = process.env.PORT || 5000;

//Starting a server .........................
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
