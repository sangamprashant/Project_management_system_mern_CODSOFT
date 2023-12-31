const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String,},
  type: {
    type: String,
    required: true,
    enum: ["admin", "employee"],
  },
});

const User = mongoose.model("PROJECTMANAGEMENTSYSTEMUSER", applicationSchema);

module.exports = User;