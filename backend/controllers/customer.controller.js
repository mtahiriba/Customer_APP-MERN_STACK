const sharp = require('sharp');
const { Customer } = require("../models");
/*
    Create Customer
    POST /api/customers
*/
async function CreateCustomer(req, res) {

    const  file  = req.file;
    const customerData = req.body;

    // // file required
    if(!file) { return res.status(400).json({ message: "profile required" });}

    // get extension of file
    const fileExtension = file.originalname.split('.').pop();

    // // file type should be image
    if(fileExtension !== "png" && fileExtension !== "jpg" && fileExtension !== "jpeg") {
        return res.status(400).json({ message: "File type should be png, jpg, or jpeg" });
    }

    // // get file size in MB
    const fileSizeInMB = file.size / (1024 * 1024);
    if(fileSizeInMB > 5) {
        return res.status(400).json({ message: "profile size should not be more than 5MB" });
    }

    // check if customer already exists
    const existsCustomer = await Customer.findOne({ userName: customerData.userName }); 
    if(existsCustomer) { return res.status(400).json({ message: "Customer already exists" }); }

    // create new customer
    const newCustomer = new Customer({
        name: customerData.name,
        userName: customerData.userName,
        email: customerData.email,
        profilePic: file.buffer.toString('base64')
    });
    await newCustomer.save();

    res.json({ message: "Customer created Successfully!" });
};

/*
    Get Customers
    GET /api/customers
*/

async function GetCustomers(req, res) {
    
    // get query params sortBy, order
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order || "desc";

    // get customers with sorting
    const customers = await Customer.find({}).sort([[sortBy, order]]);

    // return customers
    res.json({ customers });

};

/*
    Get Customer
    GET /api/customers/:id
*/
async function GetCustomer(req, res) {
    res.json({ message: "Get customer API Hit successfully" });
};

/*
    Update Customer
    PUT /api/customers/:id
*/
async function UpdateCustomer(req, res) {
    
    // get customer data and id
    const customerData = req.body;
    const customerId = req.params.id;

    // check if customer exists
    const customer = await Customer.findById(customerId);
    if(!customer) { return res.status(400).json({ message: "Customer not found" }); }

    // check if customer already exists
    const existsCustomer = await Customer.findOne({ userName: customerData.userName });
    if(existsCustomer) { return res.status(400).json({ message: "Customer already exists" }); }

    // update customer
    customer.name = customerData.name;
    customer.userName = customerData.userName;
    customer.email = customerData.email;
    await customer.save();

    res.json({ message: "Customer updated Successfully!" });
};

/*
    Delete Customer
    DELETE /api/customers/:id
*/
async function DeleteCustomer(req, res) {
    
    // get customer id
    const customerId = req.params.id;

    // check if customer exists
    const customer = await Customer.findById(customerId);
    if(!customer) { return res.status(400).json({ message: "Customer not found" }); }

    // delete customer
    await Customer.findByIdAndDelete(customerId);

    res.json({ message: "Customer deleted Successfully!" });
};

module.exports = {
    CreateCustomer,
    GetCustomers,
    GetCustomer,
    UpdateCustomer,
    DeleteCustomer
};