const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const PROJECTMANAGEMENTSYSYEMUSER = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

router.post("/api/admin/create/user", async (req, res) => {
  try {
    const { name, email } = req.body;
    const password ="1234"
    const type ="employee"

    // Check if the email is already registered
    const existingUser = await PROJECTMANAGEMENTSYSYEMUSER.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ error: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new PROJECTMANAGEMENTSYSYEMUSER({
      name,
      email,
      password: hashedPassword,
      type,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    if (savedUser) {
      savedUser.password = "1234";
    }

    // Respond with the saved user details
    res
      .status(201)
      .json({ message: "User created successfully.", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: "An error occurred.", error });
  }
});
router.post("/api/all/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await PROJECTMANAGEMENTSYSYEMUSER.findOne({ email });
    if (!user) {
      return res.status(200).json({ error: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(200).json({ error: "Invalid credentials." });
    }

    // Generate a JWT token without expiration
    const token = jwt.sign({ userId: user._id }, "your-secret-key");

    res.status(200).json({ message: "Login successfully.", token, user });
  } catch (error) {
    res.status(200).json({ error: "An error occurred.", error });
  }
});
// get all user
router.get("/api/get/user", async (req, res) => {
  try {
    const users = await PROJECTMANAGEMENTSYSYEMUSER.find({type:"employee"});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(200).json({ error: "An error occurred while fetching users." });
  }
});
//delete user
router.delete("/api/delete/user/:id", async (req, res) => {
  try {
    const deletedUser = await PROJECTMANAGEMENTSYSYEMUSER.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ message: "An error occurred while deleting the application" });
  }
});
// Add this route to your existing Express.js application
router.get("/api/get/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from URL parameter

    // Retrieve user details based on userId (you should replace this with your data retrieval logic)
    const user = await PROJECTMANAGEMENTSYSYEMUSER.findById({_id:userId});

    if (!user) {
      return res.status(200).json({ error: "User not found" });
    }

    // Respond with the user details
    res.status(200).json({message:"user found", user});
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "An error occurred while fetching user details" });
  }
});
//get count employee for user
router.get("/api/employees/count", async (req, res) => {
  try {
    const employeeCount = await PROJECTMANAGEMENTSYSYEMUSER.countDocuments({ type: "employee" });
    res.json({ count: employeeCount });
  } catch (error) {
    console.error("Error getting employee count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//change password
router.post("/api/change/password/:userId", async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from URL parameter
    const { currentPassword, newPassword } = req.body;

    // Retrieve the user based on userId
    const user = await PROJECTMANAGEMENTSYSYEMUSER.findById(userId);

    if (!user) {
      return res.status(200).json({ error: "User not found" });
    }

    // Check if the current password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(200).json({ error: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(200).json({ error: "An error occurred while changing the password" });
  }
});
// Update user's name
router.put("/api/update/name/:userId", async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from URL parameter
    const { newName } = req.body; // Get the new name from the request body

    // Retrieve the user by userId
    const user = await PROJECTMANAGEMENTSYSYEMUSER.findById(userId);

    if (!user) {
      return res.status(200).json({ error: "User not found" });
    }

    // Update the user's name
    user.name = newName;

    // Save the updated user
    await user.save();

    // Respond with a success message
    res.status(200).json({ message: "Name updated successfully", user });
  } catch (error) {
    console.error("Error updating user's name:", error);
    res.status(200).json({ error: "An error occurred while updating user's name" });
  }
});
module.exports = router;
