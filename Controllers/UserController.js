const User = require("../Models/User");

module.exports.createUser= async (req,res)=>{
    const {name,email,password} = req.body;

    try {
        let user = await User.findOne({email});
        
        if(user){
            return res.status(400).json({error:"email already exists"});
        }
        user = await User.create({
                name:name,
                email:email,
                password:password
            });

        return res.status(200).json(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"}); 
    }
}

module.exports.login = async (req,res)=>{
    const {email,password} = req.body;
    
    try {
        let user = await User.findOne({email});
        
        console.log(user);
        if(!user || (user.password!==password)){
            return res.status(400).json({error:"email/password is wrong"});
        }

        
        return res.status(200).json(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"}); 
    }
}