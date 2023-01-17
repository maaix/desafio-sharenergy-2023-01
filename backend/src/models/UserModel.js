const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    photo: {
        type: String
    },
    full_name: {
        type: String,

    },
    user_name: {
        type: String
    },
    age: {
        type: Number
    }

});

userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.statics.login = async function (email,password){
    const user = await this.findOne({ email });

    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect Password")
    }
    throw Error("incorrect Email")
}


module.exports = mongoose.model("UsersModel", userSchema)