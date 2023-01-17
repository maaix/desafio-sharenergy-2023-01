const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Password is required"],
    },
    phone: {
        type: String
    },
    address: {
        type: String,

    },
    cpf: {
        type: String
    }
}); 

module.exports = mongoose.model("Customer", customerSchema)