
/*
    Create Customer
    POST /api/customers
*/
async function CreateCustomer(req, res) {
    res.json({ message: "Create customer API Hit successfully" });
};

/*
    Get Customers
    GET /api/customers
*/

async function GetCustomers(req, res) {
    res.json({ message: "Get customers API Hit successfully" });
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
    res.json({ message: "Update customer API Hit successfully" });
};

/*
    Delete Customer
    DELETE /api/customers/:id
*/
async function DeleteCustomer(req, res) {
    res.json({ message: "Delete customer API Hit successfully" });
};

module.exports = {
    CreateCustomer,
    GetCustomers,
    GetCustomer,
    UpdateCustomer,
    DeleteCustomer
};