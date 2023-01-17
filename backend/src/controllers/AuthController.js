const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const maxAge = 3*24*60*60;

const createToken = (id) => {
    return jwt.sign({id},"Max super secret key",{
        expiresIn: maxAge,
    });
}

const handleErrors = (err) => {
    let errors = { email: "", password: ""}

    if (err.message === "incorrect Email") errors.email = "Email is not registered";
    if (err.message === "incorrect Password") errors.password= "Password is incorrect";
    if(err.code === 11000){
        errors.email = "Email already exist!";
        return errors;
    }
    if (err.message.includes("Users validation failed")){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

module.exports.register = async (request , response, next) => {
    try{
        const { email,password,photo,full_name,user_name,age } = request.body;
        const user = await UserModel.create({ email, password,photo,full_name,user_name,age});
        const token = createToken(user._id);

        response.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });

        response.status(201).json({user: user._id, created: true});

    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        response.json({errors, created : false});

    }
};

module.exports.login = async (request , response, next) => {
    try{
        const { email,password } = request.body;
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);

        response.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });

        response.status(200).json({user: user._id, created: true});

    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        response.json({errors, created : false});

    }
};