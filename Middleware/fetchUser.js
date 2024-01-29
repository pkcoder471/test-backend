const jwt = require("jsonwebtoken");
const jwt_secret="pk471";

const fetchUser = (req,res,next) =>{

    const authToken = req.header('token');
    if(!authToken){
        return res.status(401).send("unauthorized");
    }
    try {
        const data = jwt.verify(authToken,jwt_secret);
        req.user = data.user
        next();

    } catch (err) {
        console.log(err);
        res.status(401).send("unauthorized");
    }
}

module.exports = fetchUser;