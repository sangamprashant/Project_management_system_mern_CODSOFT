const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const PROJECTMANAGEMENTSYSYEMAPPLICATION = require("../models/Application");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

//create a application 
router.post("/api/submit/application", async (req, res) => {
    try {
      // Extract data from the request body
      const { name, email, mobile } = req.body;
  
      // Create a new application instance
      const newApplication = new PROJECTMANAGEMENTSYSYEMAPPLICATION({
        name,
        email,
        mobile
      });
  
      // Save the application to the database
      const savedApplication = await newApplication.save();
  
      res.status(201).json({ message: "Application submitted successfully", application: savedApplication });
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).json({ message: "An error occurred while submitting the application" });
    }
  });
  //get all application 
  router.get("/get-applications", async (req, res) => {
    try {
      const applications = await PROJECTMANAGEMENTSYSYEMAPPLICATION.find();
      res.status(200).json(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ message: "An error occurred while fetching applications" });
    }
  });
  //delete an application 
  router.delete("/delete-application/:id", async (req, res) => {
    try {
      const deletedApplication = await PROJECTMANAGEMENTSYSYEMAPPLICATION.findByIdAndDelete(req.params.id);
      
      if (!deletedApplication) {
        return res.status(404).json({ message: "Application not found" });
      }
  
      res.status(200).json({ message: "Application deleted successfully" });
    } catch (error) {
      console.error("Error deleting application:", error);
      res.status(500).json({ message: "An error occurred while deleting the application" });
    }
  });

module.exports = router;