const { renderCustomers, createCustomer, updateCustomers, deleteCustomers } = require("../controllers/CustomerController");

const customer = require("express").Router();

customer.post("/create", createCustomer);
customer.get("/read", renderCustomers);
customer.put("/update",updateCustomers);
customer.delete("/delete", deleteCustomers);


module.exports = customer;