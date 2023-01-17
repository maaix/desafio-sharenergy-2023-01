const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (request,response,next) => {
    const token = request.cookies.jwt;
    if (token){
        jwt.verify(
            token,
            "Max super secret key",
            async (err, decodedToken) => {
                if (err){
                    response.json({status: false});
                    next();
                } else {
                    const user = await User.findById(decodedToken.id);
                    if (user) response.json({ status: true, user: user.email});
                    else response.json({ status: false});
                    next();
                }
            }

        )
    }else {

    }
}