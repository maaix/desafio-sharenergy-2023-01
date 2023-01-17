const UserModel = require('../models/UserModel');

const itemsPerPage = 5;

module.exports.renderUsers = async (request,response, next) => {
        const page = request.query.page || 1;
        const skip = (page - 1) * itemsPerPage;
    
        const query = {}
        
        const count = await UserModel.estimatedDocumentCount(query);
        const user = await UserModel.find(query).limit(itemsPerPage).skip(skip);
        const pageCount = count / itemsPerPage;
    
        return response.json({
            pagination: {
                count,
                pageCount,
                itemsPerPage
            },
            user
        })
    };
    
    module.exports.renderSearchedUsers = async (request,response, next) => {
        const page = request.query.page || 1;
        const skip = (page - 1) * itemsPerPage;
        const searchedString = request.query.searchedString;
        const regex = { "$regex": searchedString, "$options": "i" };
    
        const user = await UserModel.find(
            { 
                $or: [
                        { "full_name": regex }, 
                        { "email": regex }, 
                        { "user_name": regex }
                ] 
            }
        ).limit(itemsPerPage).skip(skip);
    
        const count = user.length
        const pageCount = count / itemsPerPage;
        
        return response.json({
            pagination: {
                count,
                pageCount,
                itemsPerPage
            },
            user
        })
    };  
