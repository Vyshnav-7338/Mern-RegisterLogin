const mongoose = require("mongoose");

const RegisterFormSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const RegisterFormModel = mongoose.model("registers", RegisterFormSchema);

module.exports = RegisterFormModel;
