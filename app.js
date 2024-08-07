//const jwt = require("jsonwebtoken");
//const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs");
//const UserModel = require("./models/User.js");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const imageDownloader = require('image-downloader');
const multer = require('multer');

const { PORT } = process.env;

const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');


/*
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret =
  "This is json web token secret Just For You To Know skdjflkasdfkasldjfksdj"; */
const dirname = 'C:\\Users\\bhatt\\OneDrive\\Desktop\\fullstackProject\\fsproj\\api\\routes';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+ '/uploads'));
console.log('dirname app.js', __dirname);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);


app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});

/*

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test okey");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(newUser);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await UserModel.findOne({ email });
  console.log("userDoc here:  ", userDoc);

  if (userDoc) {
    const passCompare = bcrypt.compareSync(password, userDoc.password);
    if (passCompare) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token, { httpOnly: true }).json(userDoc);
          console.log("token", token);
        }
      ); //assigning cookie
    } else {
      res.status(422).json("Password doesnot Match..");
    }
  } else {
    res.status(422).json("not found");
  }
});

app.get("/profile", (req, res) => {
  try {
    const { token } = req.cookies;

    console.log("req.cookies", {token});  // here is problem with req.cookies not sending token when i refresh the page after login but gettin when i test api in postman

    if (token) {
      jwt.verify(token, jwtSecret, {}, (err, user) => {
        if (err) throw err;

        res.json(token);
      });

      
    } else {
      res.json("Not found cookie");
    }
  } catch (err) {
    res.status(422).json(err);
  }
});

app.listen(5555);
*/