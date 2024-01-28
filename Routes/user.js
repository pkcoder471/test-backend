const express=require("express");
const router = express.Router();
const fetchUser = require("../Middleware/fetchUser")
const UserController = require("../Controllers/UserController")

router.post('/createUser',UserController.createUser);
router.post('/login',UserController.login);
router.get('/getUser',fetchUser,UserController.getUser);

module.exports= router;