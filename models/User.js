const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["admin", "employee"], // Allowed values for the 'type' field
  },
});

const User = mongoose.model("PROJECTMANAGEMENTSYSTEMUSER", applicationSchema);

module.exports = User;