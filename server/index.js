const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterFormModel = require("./Models/RegisterModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/RegisterForm");

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("The Token was not available");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json("Wrong Token");
      next();
    });
  }
};
app.get("/home", verifyUser, (req, res) => {
  return res.json("Success");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      RegisterFormModel.create({ name, email, password: hash })
        .then((register) => res.json(register))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err.message));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  RegisterFormModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("token", token);
            res.json("Success");
          } else {
            res.json("the password is incorrect");
          }
        });
      } else {
        res.json("data not found");
      }
    })
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is Running");
});
