const express = require("express");
const router = express.Router();

// Import controllers
const { CreateCustomer, GetCustomers, GetCustomer, UpdateCustomer, DeleteCustomer } = require("../controllers");

// Customer routes
router.post("/customers", CreateCustomer); // Create a new customer
router.get("/customers", GetCustomers); // Get all customers
router.get("/customers/:id", GetCustomer); // Get a single customer
router.put("/customers/:id", UpdateCustomer); // Update a customer
router.delete("/customers/:id", DeleteCustomer); // Delete a customer

module.exports = router;