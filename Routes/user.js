const express=require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController")

router.post('/createUser',UserController.createUser);

module.exports= router;