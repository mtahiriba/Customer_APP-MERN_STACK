
// import customer controllers
const { CreateCustomer, GetCustomers, GetCustomer, UpdateCustomer, DeleteCustomer } = require("./customer.controller");

// import other controllers here


// export all controllers
module.exports = {
    CreateCustomer,
    GetCustomers,
    GetCustomer,
    UpdateCustomer,
    DeleteCustomer
};