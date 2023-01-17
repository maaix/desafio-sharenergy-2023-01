const Customer = require("../models/Customer");
const itemsPerPage = 5;

module.exports.createCustomer = async (request , response, next) => {
    try{
        const { name, email, phone, address, cpf} = request.body;
        const customer = await Customer.create({ name, email, phone, address, cpf});
       
        response.status(201).json({customer: customer._id, created: true});

    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        response.json({errors, created : false});
    }
};

module.exports.renderCustomers = async (request,response, next) => {
    const page = request.query.page || 1;
    const skip = (page - 1) * itemsPerPage;

    const query = {}
    
    const count = await Customer.estimatedDocumentCount(query);
    const customer = await Customer.find(query).limit(itemsPerPage).skip(skip);
    const pageCount = count / itemsPerPage;

    return response.json({
        pagination: {
            count,
            pageCount,
            itemsPerPage
        },
        customer
    })
};

module.exports.updateCustomers = async (request,response, next) => {
    const filter = { "_id": request.body._id};
    delete request.body._id
    // `doc` is the document _before_ `update` was applied
    let customer = await Customer.findOneAndUpdate(filter, request.body);


    return response.json({
       "data": customer
    })
}


module.exports.deleteCustomers = async (request,response, next) => {
    const id = request.query.id;
    
    // `doc` is the document _before_ `update` was applied
    let customer = await Customer.deleteOne({"_id": id});

    return response.json({
       "data": customer
    })
}