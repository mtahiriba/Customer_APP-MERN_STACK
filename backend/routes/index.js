const express = require("express");
const router = express.Router();

// Import controllers
const { CreateCustomer, GetCustomers, GetCustomer, UpdateCustomer, DeleteCustomer } = require("../controllers");

const multer = require('multer'); // For handling file uploads

// Configure the upload storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Customer routes
router.post("/customers", upload.single('file'), CreateCustomer); // Create a new customer
router.get("/customers", GetCustomers); // Get all customers
router.get("/customers/:id", GetCustomer); // Get a single customer
router.put("/customers/:id",  upload.single('file'), UpdateCustomer); // Update a customer
router.delete("/customers/:id", DeleteCustomer); // Delete a customer

module.exports = router;