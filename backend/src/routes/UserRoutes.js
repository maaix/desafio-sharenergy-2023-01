const  {renderUsers, renderSearchedUsers}  = require("../controllers/UserController");
const { register } = require("../controllers/AuthController");

const user = require("express").Router();

user.post("/generate_user", register);
user.get("/users", renderUsers);
user.get("/users_by_string", renderSearchedUsers);

module.exports = user;

