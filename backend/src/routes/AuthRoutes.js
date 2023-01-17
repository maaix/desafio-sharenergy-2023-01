const { register,login } = require("../controllers/AuthController");
const { checkUser } = require("../middlewares/AuthMiddlewares");
const auth = require("express").Router();

auth.post("/", checkUser);
auth.post("/register", register);
auth.post("/login", login);

module.exports = auth;
