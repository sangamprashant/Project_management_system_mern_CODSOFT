const mongoose = require("mongoose");

const application = new mongoose.Schema({
  name: { type: String, required: true },          // Full name of the user
  email: { type: String, required: true },        // Email address of the user
  mobile: { type: String, required: true }
});

const USER = mongoose.model("PROJECTMANAGEMENTSYSYEMAPPLICATION", application);

module.exports = USER;