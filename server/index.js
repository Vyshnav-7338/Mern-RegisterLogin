const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterFormModel = require("./Models/RegisterModel");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/RegisterForm");

app.post("/register", (req, res) => {
  RegisterFormModel.create(req.body)
    .then((register) => res.json(register))
    .catch((err) => res.json(err));
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  RegisterFormModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("the password is incorrect");
        }
      } else {
        res.json("data not found");
      }
    })
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is Running");
});
