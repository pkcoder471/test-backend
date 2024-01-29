const express=require("express");
const router = express.Router();
const fetchUser = require("../Middleware/fetchUser")
const UserController = require("../Controllers/UserController")
const {body} = require('express-validator');

router.post('/createUser',[
    body('name','enter valid name').isLength({min:3}),
    body('email','enter valid email').isEmail(),
    body('password','enter valid password').isLength({min:5}),
],UserController.createUser);
router.post('/login',[
    body('email','enter valid email').isEmail(),
    body('password','password should not be blank').exists(),
],UserController.login);
router.get('/getUser',fetchUser,UserController.getUser);

module.exports= router;