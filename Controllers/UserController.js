const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_secret = "pk471";

module.exports.createUser= async (req,res)=>{
    const {name,email,password} = req.body;

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

        return res.json({authToken});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"}); 
    }
}

module.exports.login = async (req,res)=>{
    const {email,password} = req.body;
    
    try {
        let user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({error:"email/password is wrong"});
        }

        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password,salt);

        const comparePassword = await bcrypt.compare(user.password,pass);

        if(!comparePassword){
            return res.status(400).json({error:"email/password is wrong"});
        }
        
        const data = {
            user:{
                id:user.id
            }
        }

        const authToken = jwt.sign(data,jwt_secret);

        return res.json({authToken});
        
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