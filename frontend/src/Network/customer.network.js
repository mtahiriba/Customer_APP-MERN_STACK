import axios from "axios";

const getAllCustomers = (sortBy, order ) => {
  let headersList = {
    Accept: "*/*",
  };

  let reqOptions = {
    url: `http://localhost:4000/api/customers?sortBy=${sortBy}&order=${order}`,
    method: "GET",
    headers: headersList,
  };

  return axios(reqOptions);
};

const createCustomer = async (customer) => {
  let headersList = {
    Accept: "*/*",
  };

  let formData = new FormData();
  formData.append("name", customer.name);
  formData.append("userName", customer.username);
  formData.append("email", customer.email);  
  formData.append("file", customer.photo);

  let bodyContent = formData;

  let reqOptions = {
    url: "http://localhost:4000/api/customers",
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };

  return axios.request(reqOptions);
};

const deleteCustomer = async (customerId) => {

    let headersList = {
        Accept: "*/*",
    };
    
    let reqOptions = {
        url: `http://localhost:4000/api/customers/${customerId}`,
        method: "DELETE",
        headers: headersList,
    };
    
    return axios.request(reqOptions);
};

const updateCustomer = async (customerId, customer) => {
  let headersList = {
    Accept: "*/*",
  };

  let formData = new FormData();
  formData.append("name", customer.name);
  formData.append("userName", customer.username);
  formData.append("email", customer.email);  
  formData.append("file", customer.photo);

  let bodyContent = formData;

  let reqOptions = {
    url: `http://localhost:4000/api/customers/${customerId}`,
    method: "PUT",
    headers: headersList,
    data: bodyContent,
  };

  return axios.request(reqOptions);
}


export { getAllCustomers, createCustomer, deleteCustomer, updateCustomer };
