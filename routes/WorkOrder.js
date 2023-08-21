const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const PROJECTMANAGEMENTSYSYEMWorkOrder = require("../models/WorkOrder");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Route to assign a work order to a user
router.post("/api/assign/work", async (req, res) => {
  try {
    const { workTitle, assignedTo, workDetails } = req.body;

    // Create a new work order
    const newWorkOrder = new PROJECTMANAGEMENTSYSYEMWorkOrder({
      workTitle,
      workDetails, // Assuming assignedTo is a valid user ID
      assignedTo,
      status: "pending", // Set the initial status to "pending" or another suitable default
    });

    // Save the new work order to the database
    const savedWorkOrder = await newWorkOrder.save();

    res.status(201).json({
      message: "Work order assigned successfully.",
      workOrder: savedWorkOrder,
    });
  } catch (error) {
    console.error("Error assigning work order:", error);
    res
      .status(200)
      .json({ error: "An error occurred while assigning work order." });
  }
});
//getting data to admin
router.get("/api/get/all/works", async (req, res) => {
  try {
    // Fetch all work orders and populate the "assignedTo" field with user names
    const work = await PROJECTMANAGEMENTSYSYEMWorkOrder.find().populate(
      "assignedTo",
      "name"
    ); // Populate with the "name" field of the "User" model

    // Create objects to store work orders based on status
    const workByStatus = {
      pending: [],
      confirmed: [],
      working: [],
      done: [],
      canceled: [],
    };

    // Categorize work orders by status
    work.forEach((item) => {
      const { status } = item;
      if (workByStatus.hasOwnProperty(status)) {
        workByStatus[status].push(item);
      }
    });

    res.status(200).json({ message: "find data found", workByStatus });
  } catch (error) {
    console.error("Error fetching work details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching Work details" });
  }
});
// Update the status of a work order by ID
router.put("/api/update/status/:id", async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body; // Assuming you send the new status in the request body

  try {
    const workOrder = await PROJECTMANAGEMENTSYSYEMWorkOrder.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    if (!workOrder) {
      return res.status(200).json({ error: "Work order not found" });
    }

    return res
      .status(200)
      .json({ message: "Status updated successfully", workOrder });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(200).json({ error: "Internal Server Error" });
  }
});
// Route to get the count of canceled and remaining items
router.get("/api/workorders/count", async (req, res) => {
  try {
    const canceledCount = await PROJECTMANAGEMENTSYSYEMWorkOrder.countDocuments(
      { status: "canceled" }
    );
    const remainingCount =
      await PROJECTMANAGEMENTSYSYEMWorkOrder.countDocuments({
        status: { $ne: "canceled" },
      });

    res.json({ canceledCount, remainingCount });
  } catch (error) {
    console.error("Error getting counts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//get user order of user
router.get("/api/user/work/:userId", async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from URL parameter
    // Retrieve the work orders assigned to this user
    const userWork = await PROJECTMANAGEMENTSYSYEMWorkOrder.find({
      assignedTo: userId,
    });
    // Create objects to store work orders based on status
    const workByStatus = {
      pending: [],
      confirmed: [],
      working: [],
      done: [],
      canceled: [],
    };

    // Categorize work orders by status
    userWork.forEach((item) => {
      const { status } = item;
      if (workByStatus.hasOwnProperty(status)) {
        workByStatus[status].push(item);
      }
    });

    res.status(200).json({ message: "find data found", workByStatus });
  } catch (error) {
    console.error("Error fetching user's work:", error);
    res.status(200).json({ error: "An error occurred while fetching user's work" });
  }
});
// Get the count of work orders for a user (where status is pending or confirmed)
router.get("/api/user/work/count/:userId", async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from URL parameter

    
    // Count the work orders assigned to this user with status pending or confirmed
    const Pending = await PROJECTMANAGEMENTSYSYEMWorkOrder.countDocuments({
      assignedTo: userId,
      status: { $in: ["pending", "confirmed", "working"] },
    });
    const Done = await PROJECTMANAGEMENTSYSYEMWorkOrder.countDocuments({
      assignedTo: userId,
      status: "done",
    });
    const Canceled = await PROJECTMANAGEMENTSYSYEMWorkOrder.countDocuments({
      assignedTo: userId,
      status: "canceled",
    });

    // Respond with the count of work orders
    res.status(200).json({ Pending,Done,Canceled });
  } catch (error) {
    console.error("Error fetching work order count:", error);
    res.status(500).json({ error: "An error occurred while fetching work order count" });
  }
});
module.exports = router;
