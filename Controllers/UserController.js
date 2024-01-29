const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_secret = "pk471";
const {validationResult} = require('express-validator');

module.exports.createUser= async (req,res)=>{
    const {name,email,password} = req.body;
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        let user = await User.findOne({email});
        
        if(user){
            return res.status(400).json({error:"email already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password,salt);

        user = await User.create({
                name:name,
                email:email,
                password:pass
            });

        const data = {
            user:{
                id:user.id
            }
        }

        const authToken = jwt.sign(data,jwt_secret);
        success = true;
        return res.json({success,authToken});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"}); 
    }
}

module.exports.login = async (req,res)=>{
    const {email,password} = req.body;
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        let user = await User.findOne({email});
        
        
        if(!user){
            return res.status(400).json({error:"email/password is wrong"});
        }

        const comparePassword = await bcrypt.compare(password,user.password);

        if(!comparePassword){
            return res.status(400).json({error:"email/password is wrong"});
        }
        
        const data = {
            user:{
                id:user.id
            }
        }

        const authToken = jwt.sign(data,jwt_secret);
        success = true;
        return res.json({success,authToken});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"}); 
    }
}

module.exports.getUser = async (req,res)=>{
    try {
        const id = req.user.id;
        let user = await User.findById(id).select('-password');

        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"}); 
    }
}