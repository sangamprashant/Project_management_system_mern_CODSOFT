const mongoose = require("mongoose");
const User = require("./User");

const workOrderSchema = new mongoose.Schema({
  workTitle: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true }, // Reference to the user who is assigned the work
  workDetails: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["pending", "confirmed", "working", "done","canceled"],
    default: "pending", // Set the default status to "pending"
  },
});

const WorkOrder = mongoose.model("PROJECTMANAGEMENTSYSYEMWorkOrder", workOrderSchema);

module.exports = WorkOrder;
